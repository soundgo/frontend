import {Component, OnInit} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
    MatBottomSheet,
} from '@angular/material';
import {MapService} from '../../../services/map.service';
import {ContextService} from '../../../services/context.service';
import {SitePanelSheetComponent} from '../site-panel-sheet/site-panel-sheet.component';
import {Observable} from 'rxjs';
import {FeatureCollection, GeoJson} from '../../../shared/models/Map';
import {Site} from '../../../shared/models/Site';
import {AudioReproducerPanelComponent} from '../audio-reproducer-panel/audio-reproducer-panel.component';
import {AngularFirestore} from '@angular/fire/firestore';
import {ApiService} from '../../../services/api.service';
import {AdReproducerPanelComponent} from '../ad-reproducer-panel/ad-reproducer-panel.component';

import * as turf from '@turf/turf';

@Component({
    selector: 'app-map-box',
    templateUrl: './map-box.component.html',
    styleUrls: ['./map-box.component.scss'],
    providers: [MapService],
})
export class MapBoxComponent implements OnInit {
    map: mapboxgl.Map;
    style = 'mapbox://styles/soundgo/cjtheyu3i008g1gmp23th92b9';
    container = 'map';
    source: any;

    audios: Observable<any[]>;
    ads: Observable<any[]>;
    sites: Observable<any[]>;
    audioSource: any;
    adSource: any;
    siteSource: any;
    isDataLoaded = false;
    userPosition: any;
    showPlaceMarkerForm = false;
    siteEntity: Site;
    siteMarker: any;
    categoriesSelected = 'Tourism,Experience,Leisure';

    constructor(private bottomSheet: MatBottomSheet,
                private mapService: MapService,
                private context: ContextService,
                private db: AngularFirestore,
                private api: ApiService) {

        // Filter audio category
        this.context.getCategoriesSelected().subscribe(categoriesSelected => {
            if (this.map) {
                this.categoriesSelected = categoriesSelected;
                this.map.setFilter('audios', this.filterCategories(categoriesSelected));
            }
        });

        // Filter by tags
        this.context.getTagsSelected().subscribe(tagsSelected => {
            if (tagsSelected && tagsSelected[0] === 'active-tag-panel-sheet') {
                this.audioSource.setData(new FeatureCollection([]));
            } else if (tagsSelected && tagsSelected[0] === 'inactive-tag-panel-sheet') {
                this.db.collection('audios').valueChanges().subscribe((data: GeoJson[]) => {
                    this.audioSource.setData(new FeatureCollection(data));
                });
            } else if (tagsSelected !== null) {
                this.db.collection('audios').valueChanges().subscribe((data: GeoJson[]) => {
                    data = data.filter(({properties}: any) => {
                        return properties.tags.length !== 0 && properties.tags.some(tag => {
                            return tagsSelected.indexOf(tag) !== -1;
                        });
                    });
                    this.audioSource.setData(new FeatureCollection(data));
                });
            }
        });

        // Show site marker in map
        this.context.getIsMarkerSiteVisible().subscribe(isMarkerSiteVisible => {
            if (isMarkerSiteVisible) {
                this.userPosition = this.context.getPosition().getValue();
                this.showPlaceMarkerForm = true;
                this.showMarkerPlaceSite();
            } else {
                this.showPlaceMarkerForm = false;
            }
        });
    }

    ngOnInit() {
        this.buildMap();
    }

    filterCategories(categoriesSelected) {
        const res: any[] = ['any'];

        categoriesSelected.split(',').forEach(cat => {
            res.push(['==', 'type', cat]);
        });

        return res;
    }

    initDataListeners() {
        this.audioSource = this.map.getSource('audios');
        this.adSource = this.map.getSource('ads');
        this.siteSource = this.map.getSource('sites');

        this.showAudios();

        this.db.collection('sites').valueChanges().subscribe((data: GeoJson[]) => {
            this.siteSource.setData(new FeatureCollection(data));
        });
    }

    initSourceLayers() {
        this.map.addSource('audios', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });
        this.map.addLayer({
            id: 'audios',
            source: 'audios',
            type: 'symbol',
            layout: {
                'icon-image': 'Marker',
                'icon-allow-overlap': true
            }
        });
        this.map.addSource('sites', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });
        this.map.addLayer({
            id: 'sites',
            source: 'sites',
            type: 'symbol',
            layout: {
                'icon-image': 'MarkerSite',
                'icon-allow-overlap': true
            }
        });
        this.map.addSource('ads', {
            type: 'geojson',
            data: {
                type: 'FeatureCollection',
                features: []
            }
        });
        this.map.addLayer({
            id: 'ads',
            source: 'ads',
            type: 'symbol',
            layout: {
                'icon-image': 'MarkerAd',
                'icon-allow-overlap': true
            }
        });
    }

    showAudios() {
        this.db.collection('audios').valueChanges().subscribe((data: GeoJson[]) => {
            const isBadFormattedData = data.some(ad => this.isEmtpy(ad));
            if (!isBadFormattedData) {
                const user = this.context.getUser().getValue();
                const filteredAudios = this.filterAudios(data, user);
                this.audioSource.setData(new FeatureCollection(filteredAudios));
            }
        });
    }

    showAds(position) {
        this.db.collection('ads').valueChanges().subscribe((data: GeoJson[]) => {
            const isBadFormattedData = data.some(ad => this.isEmtpy(ad));
            if (!isBadFormattedData) {
                const user = this.context.getUser().getValue();
                const filteredAds = this.filterAds(data, user, position);
                this.adSource.setData(new FeatureCollection(filteredAds));
            }
        });
    }

    buildMap() {
        Object.getOwnPropertyDescriptor(mapboxgl, 'accessToken')
            .set('pk.eyJ1Ijoic291bmRnbyIsImEiOiJjanRlYmM5dXcxY2tqNGFwYzNrOGkwcngzIn0.aBKY-GfqDJRHrxP0e2Yc0Q');

        const coords = this.context.getPosition().getValue();
        this.map = new mapboxgl.Map({
            container: this.container as string,
            style: this.style,
            zoom: 13,
            center: [
                (coords && coords.longitude) || -5.987,
                (coords && coords.latitude) || 37.358,
            ],
        });

        const geolocation = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        });
        this.map.addControl(geolocation, 'top-left');

        this.map.addControl(new mapboxgl.NavigationControl(), 'top-left');

        this.map.on('load', () => {
            geolocation.trigger();

            geolocation.on('geolocate', () => {
                if (this.context.getPosition().getValue() === null) {
                    this.initSourceLayers();
                    this.initDataListeners();

                    this.context.getAuth().subscribe(_ => {
                        const position = this.context.getPosition().getValue();
                        if (position) {
                            this.showAds(position);
                        }
                    });
                }

                const userLocation = (geolocation as any)._lastKnownPosition;
                const {latitude, longitude} = userLocation.coords;
                this.context.setPosition({latitude, longitude});
                this.showAds({latitude, longitude});
            });

            this.isDataLoaded = true;
            this.context.setMap(this.map);
        });

        this.map.on('click', ({point}) => {

            const site = this.isMarkerType(point, 'sites');
            if (site) {
                this.openSiteSheet(site.properties);
            }

            const audio = this.isMarkerType(point, 'audios');
            if (audio) {
                this.openAudioReproducer(audio.properties);
            }

            const ad = this.isMarkerType(point, 'ads');
            if (ad) {
                this.openAdReproducer(ad.properties);
            }

        });
    }

    isMarkerType(point, type) {
        const features = this.map.queryRenderedFeatures(point, {
            layers: [type],
        });
        return features[0];
    }

    openAudioReproducer(properties) {
        this.bottomSheet.open(AudioReproducerPanelComponent, {
            data: {
                properties,
            }
        });
    }

    openAdReproducer(properties) {
        this.bottomSheet.open(AdReproducerPanelComponent, {
            data: {
                properties,
            }
        });
    }

    openSiteSheet(properties): void {
        this.bottomSheet.open(SitePanelSheetComponent, {
            data: {
                properties,
            }
        });
    }

    showMarkerPlaceSite() {

        const center = this.map.getCenter();
        this.siteMarker = new mapboxgl.Marker({
            draggable: true
        })
            .setLngLat([center.lng, center.lat])
            .addTo(this.map);
    }

    saveSiteForm() {
        this.context.setLoading(true);
        this.siteEntity = this.context.getSiteEntity().getValue();

        const {lng, lat} = this.siteMarker.getLngLat();
        this.siteEntity.longitude = lng;
        this.siteEntity.latitude = lat;

        this.context.setSiteEntity(this.siteEntity);
        this.api.createSite(this.siteEntity).then(response => {
            console.log('Site created response', response);
            this.context.setLoading(false);
        });
        this.context.setIsMarkerSiteVisible(false);
        this.siteMarker.remove();
    }

    closeSiteForm() {
        this.context.setIsMarkerSiteVisible(false);
        this.siteMarker.remove();
    }

    isUserInsideAdvertArea(ad, position = this.context.getPosition().getValue()) {
        if (position) {
            const {latitude, longitude} = position;
            const userPosition = turf.point([longitude, latitude]);
            const center = [ad.geometry.coordinates[0], ad.geometry.coordinates[1]];
            const radius = ad.properties.radius / 1000;
            const adCircle = turf.circle(center, radius);
            return turf.booleanPointInPolygon(userPosition, adCircle);
        }
    }

    isEmtpy(item) {
        return JSON.stringify(item) === JSON.stringify({});
    }

    notFilterRecordIfUserIsOwner(record, user) {
        return user && user.id === (record as any).properties.actorId;
    }

    filterAudioTimePass(audio) {
        return audio.properties.timestampFinish.seconds >= (Date.now() / 1000);
    }

    filterAds(data, user, position) {
        return data.filter(ad => {
            return this.notFilterRecordIfUserIsOwner(ad, user) ||
                this.isUserInsideAdvertArea(ad, {
                    latitude: position.latitude,
                    longitude: position.longitude
                }) &&
                ad.properties.isActive &&
                !ad.properties.isDelete;
        });
    }

    filterAudios(data, user) {
        return data.filter(audio => {
            return this.notFilterRecordIfUserIsOwner(audio, user) ||
                this.filterAudioTimePass(audio) &&
                !audio.properties.isInappropriate &&
                !audio.properties.site;
        });
    }

}

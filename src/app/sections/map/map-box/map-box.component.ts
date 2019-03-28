import {Component, OnInit, Inject} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
    MatBottomSheet,
    MatBottomSheetRef,
    MAT_BOTTOM_SHEET_DATA,
} from '@angular/material';
import {MapService} from '../../../services/map.service';
import {ContextService} from '../../../services/context.service';
import {SitePanelSheetComponent} from '../site-panel-sheet/site-panel-sheet.component';
import {Observable, Subscription} from 'rxjs';
import {FeatureCollection} from '../../../shared/models/Map';
import {Site} from '../../../shared/models/Site';
import {AudioReproducerPanelComponent} from '../audio-reproducer-panel/audio-reproducer-panel.component';
import {Audio} from '../../../shared/models/Audio';
import {AngularFirestore} from '@angular/fire/firestore';
import {ApiService} from '../../../services/api.service';
import {AdReproducerPanelComponent} from '../ad-reproducer-panel/ad-reproducer-panel.component';
import {Ad} from '../../../shared/models/Ad';

import * as turf from '@turf/turf';

@Component({
    selector: 'app-map-box1',
    templateUrl: './map-box.component.html',
    styleUrls: ['./map-box.component.scss'],
    providers: [MapService],
})
export class MapBoxComponent implements OnInit {
    map: mapboxgl.Map;
    style = 'mapbox://styles/soundgo/cjtheyu3i008g1gmp23th92b9';
    container = 'map';
    subscription: Subscription;
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

    constructor(private bottomSheet: MatBottomSheet,
                private mapService: MapService,
                private context: ContextService,
                private db: AngularFirestore,
                private api: ApiService) {

        // Observable in database
        this.audios = db.collection('audios').valueChanges();
        this.ads = db.collection('ads').valueChanges();
        this.sites = db.collection('sites').valueChanges();
        // Filter audio category
        this.context.getCategoriesSelected().subscribe(categorySelected => {
            if (this.map) {
                this.map.setFilter('audios', ['==', 'type', categorySelected]);
            }
        });
        // Show site marker in map
        this.context.getIsMarkerSiteVisible().subscribe(isMarkerSiteVisible => {
            if (isMarkerSiteVisible) {
                this.userPosition = this.context.getPosition().getValue();
                this.showPlaceMarkerForm = true;
            } else {
                this.showPlaceMarkerForm = false;
            }
        });

    }

    ngOnInit() {
        this.buildMap();
    }

    initDataListeners() {
        this.audioSource = this.map.getSource('audios');
        this.adSource = this.map.getSource('ads');
        this.siteSource = this.map.getSource('sites');

        this.audios.subscribe(data => {
            this.audioSource.setData(new FeatureCollection(data));
        });
        this.ads.subscribe(data => {
            /*data = data.filter(ad => {
                return this.isUserInsideAdvertArea(ad);
            });*/
            this.adSource.setData(new FeatureCollection(data));
        });
        this.sites.subscribe(data => {
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
                'icon-image': 'Marker'
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
                'icon-image': 'MarkerSite'
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
                'icon-image': 'MarkerAd'
            }
        });
    }

    isUserInsideAdvertArea(ad, position = this.context.getPosition().getValue()) {
        const {latitude, longitude} = position;
        const userPosition = turf.point([longitude, latitude]);
        const center = [ad.geometry.coordinates[0], ad.geometry.coordinates[1]];
        const radius = 5;
        const adCircle = turf.circle(center, radius);
        return turf.booleanPointInPolygon(userPosition, adCircle);
    }

    buildMap() {
        // Create map site
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
        this.map.addControl(geolocation);

        // Add button to know your position
        this.map.addControl(new mapboxgl.NavigationControl());


        this.map.on('load', () => {
            this.initSourceLayers();
            this.initDataListeners();

            geolocation.trigger();
            /*this.context.getPosition().asObservable().subscribe(position => {
                this.ads.subscribe(data => {
                    data = data.filter(ad => {
                        return this.isUserInsideAdvertArea(position, ad);
                    });
                    this.adSource.setData(new FeatureCollection(data));
                });
            });*/

            this.isDataLoaded = true;
            this.context.setMap(this.map);
            this.context.startWatchPosition();
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
        this.api.getAudioById(properties.id).then(audio => {
            this.bottomSheet.open(AudioReproducerPanelComponent, {
                data: {
                    properties,
                    audio: new Audio(audio)
                }
            });
        });
    }

    openAdReproducer(properties) {
        this.api.getAdById(properties.id).then(ad => {
            this.bottomSheet.open(AdReproducerPanelComponent, {
                data: {
                    properties,
                    ad: new Ad(ad)
                }
            });
        });
    }

    openSiteSheet(properties): void {
        Promise.all([
            this.api.getSiteAudios(properties.id),
            this.api.getSiteById(properties.id)
        ]).then(values => {
            this.bottomSheet.open(SitePanelSheetComponent, {
                data: {
                    properties,
                    site: new Site(values[1]),
                    audios: values[0]
                }
            });
        });
    }
}

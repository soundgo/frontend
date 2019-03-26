import { Component, OnInit, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet } from '@angular/material';
import { Observable } from 'rxjs';

import { MapService } from 'src/app/services/map.service';
import { FeatureCollection, GeoJson } from 'src/app/shared/models/Map';
import { Map } from 'mapbox-gl';
import { SitePanelSheetComponent } from '../site-panel-sheet/site-panel-sheet.component';
import { ContextService } from 'src/app/services/context.service';


@Component({
  selector: 'app-map-box',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
  providers: [MapService],
})
export class MapComponent implements OnInit {

  @ViewChildren('geolocation') geolocation: any;
  mapbox: Map;
  audios: Observable<any[]>;
  ads: Observable<any[]>;
  sites: Observable<any[]>;
  categorySelected: string;
  audioSource: any;
  adSource: any;
  siteSource: any;
  isDataLoaded: boolean = false;

  constructor(private mapService: MapService, private context: ContextService, private db: AngularFirestore, private bottomSheet: MatBottomSheet) {
    // Observable in database
    this.audios = db.collection('audios').valueChanges();
    this.ads = db.collection('ads').valueChanges();
    this.sites = db.collection('sites').valueChanges();
    // Filter audio category
    this.context.getCategoriesSelected().subscribe(categorySelected => {
      this.categorySelected = categorySelected;
    });
  }

  ngOnInit() { }

  initMap(mapbox) {
    console.log('Mapa inicializado', mapbox);
    this.mapbox = mapbox;

    // Trigger geolocation
    this.geolocation.first.control.trigger();

    this.initSourceLayers();
    this.initDataListeners();

    this.isDataLoaded = true;
    this.context.setMap(this.mapbox);
    this.context.startWatchPosition();

    this.mapbox.on('click', (event) => {
      // const coordinates = [event.lngLat.lng, event.lngLat.lat]
      // // const newMarkerAudio = new GeoJson(coordinates, { type: 'Experience' })
      // const newMarkerSite = new GeoJson(coordinates, { name: 'Casa Paco', id: '1' })
      // this.mapService.createSiteMarker(newMarkerSite)

      // Get point click and check if is a marker
      const features = this.mapbox.queryRenderedFeatures(event.point, {
        layers: ['sites'],
      });
      // If not is a marker return
      if (!features.length) {
        return;
      }
      const feature = features[0];
      this.openSiteSheet(feature.properties);
    })

  }

  openSiteSheet(properties): void {
    this.bottomSheet.open(SitePanelSheetComponent, {
      data: { properties },
    });
  }

  initDataListeners() {
    this.audioSource = this.mapbox.getSource('audios')
    this.adSource = this.mapbox.getSource('ads')
    this.siteSource = this.mapbox.getSource('sites')

    this.audios.subscribe(data => {
      this.audioSource.setData(new FeatureCollection(data))
    })
    this.ads.subscribe(data => {
      this.adSource.setData(new FeatureCollection(data))
    })
    this.sites.subscribe(data => {
      this.siteSource.setData(new FeatureCollection(data))
    })
  }

  initSourceLayers() {
    this.mapbox.addSource('audios', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });
    this.mapbox.addSource('sites', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });
    this.mapbox.addSource('ads', {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: []
      }
    });
  }


}

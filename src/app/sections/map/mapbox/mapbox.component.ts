import { Component, OnInit, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatBottomSheet, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';

import { MapService } from 'src/app/services/map.service';
import { FeatureCollection } from 'src/app/shared/models/Map';
import { Map, NavigationControl } from 'mapbox-gl';
import { SitePanelSheetComponent } from '../site-panel-sheet/site-panel-sheet.component';
import { ContextService } from 'src/app/services/context.service';
import { Site } from 'src/app/shared/models/Site';
import { ApiService } from '../../../services/api.service'

@Component({
  selector: 'app-map-box',
  templateUrl: './mapbox.component.html',
  styleUrls: ['./mapbox.component.scss'],
  providers: [MapService],
})
export class MapComponent implements OnInit {

  @ViewChildren('geolocation') geolocation: any;
  @ViewChildren('siteMarker') siteMarker: any;
  mapbox: Map;
  audios: Observable<any[]>;
  ads: Observable<any[]>;
  sites: Observable<any[]>;
  categorySelected: string;
  audioSource: any;
  adSource: any;
  siteSource: any;
  isDataLoaded: boolean = false;
  userPosition: any;
  showPlaceMarkerForm: boolean = false;
  siteEntity: Site;

  constructor(private mapService: MapService, private context: ContextService,
    private db: AngularFirestore, private bottomSheet: MatBottomSheet, private api: ApiService) {
    // Observable in database
    this.audios = db.collection('audios').valueChanges();
    this.ads = db.collection('ads').valueChanges();
    this.sites = db.collection('sites').valueChanges();
    // Filter audio category
    this.context.getCategoriesSelected().subscribe(categorySelected => {
      this.categorySelected = categorySelected;
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

  ngOnInit() { }

  initMap(mapbox) {
    console.log('Mapa inicializado', mapbox);
    this.mapbox = mapbox;

    // Trigger geolocation
    this.geolocation.first.control.trigger();
    this.mapbox.addControl(new NavigationControl());

    this.initSourceLayers();
    this.initDataListeners();

    this.isDataLoaded = true;
    this.context.setMap(this.mapbox);
    this.context.startWatchPosition();

    this.mapbox.on('click', (event) => {
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

  saveSiteForm() {
    this.siteEntity = this.context.getSiteEntity().getValue();

    console.log(this.siteMarker, 'site marker')
    this.siteEntity.longitude = this.siteMarker.first.lngLat[0];
    this.siteEntity.latitude = this.siteMarker.first.lngLat[1];

    this.context.setSiteEntity(this.siteEntity)
    this.api.createSite(this.siteEntity).then(response => {
      console.log('Site created response', response)
    });
    this.context.setIsMarkerSiteVisible(false);
  }

  closeSiteForm() {
    this.context.setIsMarkerSiteVisible(false);
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

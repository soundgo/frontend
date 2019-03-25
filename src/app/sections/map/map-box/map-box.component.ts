import { Component, OnInit, Inject } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material';
import { MapService } from '../../../services/map.service';
import { ContextService } from '../../../services/context.service';
import { SitePanelSheetComponent } from '../site-panel-sheet/site-panel-sheet.component';
import { Subscription } from 'rxjs';
import { FeatureCollection } from '../../../shared/models/Map';

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
  subscription: Subscription;
  source: any;

  constructor(
    private context: ContextService,
    private bottomSheet: MatBottomSheet
  ) {
    this.subscription = this.context
      .getIsAudioRecorded()
      .subscribe(isAudioRecorded => {
        if (isAudioRecorded) {
          this.source = this.map.getSource('audiosRecorded');

          const audioEntity = this.context.getAudioEntity().getValue();
          const features = this.source._data.features;
          features.push({
            type: 'Feature',
            properties: {},
            geometry: {
              coordinates: [audioEntity.longitude, audioEntity.latitude],
              type: 'Point',
            },
            id: audioEntity.id,
          });
          const data = new FeatureCollection(features);
          this.source.setData(data);
          this.map.addLayer({
            id: 'audiosRecorded',
            source: 'audiosRecorded',
            type: 'symbol',
            layout: {
              'text-size': 24,
              'icon-image': 'Marker',
            },
          });
        }
      });
  }

  ngOnInit() {
    this.initializeMap();
  }

  // Dialog
  openSiteSheet(properties): void {
    this.bottomSheet.open(SitePanelSheetComponent, {
      data: { properties },
    });
  }

  private initializeMap() {
    this.buildMap();
    this.context.startWatchPosition();
  }

  buildMap() {
    // Create map site
    mapboxgl.accessToken =
      'pk.eyJ1Ijoic291bmRnbyIsImEiOiJjanRlYmM5dXcxY2tqNGFwYzNrOGkwcngzIn0.aBKY-GfqDJRHrxP0e2Yc0Q';
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

    this.context.setMap(this.map);

    // Add button to know your position
    this.map.addControl(new mapboxgl.NavigationControl());

    // Track control of user
    const geolocateUser = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    this.map.addControl(geolocateUser);

    // Trigger geolocation
    this.map.on('load', () => {
      geolocateUser.trigger();
      if (!this.source) {
        this.map.addSource('audiosRecorded', {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: [],
          },
        });
      }
    });

    // Action - when user press record
    this.map.on('click', event => {
      // Get point click and check if is a marker
      const features = this.map.queryRenderedFeatures(event.point, {
        layers: ['Sites'],
      });
      // If not is a marker return
      if (!features.length) {
        return;
      }
      // Get marker and check if is an audio or site
      const feature = features[0];

      if (feature.properties.type === 'Audio') {
        console.log('Es un audio, no se muestra');
      } else {
        this.openSiteSheet(feature.properties);
      }
    });
  }
}

import { Component, OnInit, Inject } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material';
import { MapService } from '../../../services/map.service';
import { ContextService } from '../../../services/context.service';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
  providers: [MapService],
})
export class MapBoxComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/soundgo/cjtheyu3i008g1gmp23th92b9';
  container: string = 'map';

  constructor(
    private context: ContextService,
    private bottomSheet: MatBottomSheet
  ) {}

  ngOnInit() {
    this.initializeMap();
  }

  // Dialog
  openSiteSheet(properties): void {
    this.bottomSheet.open(SitePanelSheet, {
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
      container: this.container,
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

@Component({
  selector: 'site-panel-sheet',
  templateUrl: 'site-panel-sheet.html',
})
export class SitePanelSheet implements OnInit {
  loading = false;
  audios: any;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<SitePanelSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit() {}

  getAudiosFromSite(id): void {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

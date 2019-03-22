import { Component, OnInit, Inject } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material';

import { MapService } from '../../../services/map.service';
import {
  IPropeties,
  GeoJson,
  FeatureCollection,
} from '../../../shared/models/Map';

@Component({
  selector: 'app-map-box',
  templateUrl: './map-box.component.html',
  styleUrls: ['./map-box.component.scss'],
  providers: [MapService],
})
export class MapBoxComponent implements OnInit {
  map: mapboxgl.Map;
  style = 'mapbox://styles/soundgo/cjtheyu3i008g1gmp23th92b9';
  container: 'map';
  accessToken: 'pk.eyJ1Ijoic291bmRnbyIsImEiOiJjanRlYmM5dXcxY2tqNGFwYzNrOGkwcngzIn0.aBKY-GfqDJRHrxP0e2Yc0Q';
  lat = 37.358;
  lng = -5.987;

  // menus & modals
  showAdvertisementMarkerMenu: boolean = false;
  source: any;

  constructor(
    private mapService: MapService,
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
    // Locate the user
    // if (navigator.geolocation) {
    //   navigator.geolocation.getCurrentPosition(position => {
    //     this.lat = position.coords.latitude;
    //     this.lng = position.coords.longitude;

    //   });
    // }
    this.buildMap();
  }

  buildMap() {
    // Create map site
    mapboxgl.accessToken =
      'pk.eyJ1Ijoic291bmRnbyIsImEiOiJjanRlYmM5dXcxY2tqNGFwYzNrOGkwcngzIn0.aBKY-GfqDJRHrxP0e2Yc0Q';
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });
    // Add button to know your position
    this.map.addControl(new mapboxgl.NavigationControl());

    // Action - when user press record
    this.map.on('click', event => {
      // Get point click and check if is a marker
      const features = this.map.queryRenderedFeatures(event.point, {
        layers: ['audios'],
      });
      // If not is a marker return
      this.setAdvertisementMarker();
      if (!features.length) {
        return;
      }
      // Get marker and check if is an audio or site
      const feature = features[0];

      if (feature.properties.type == 'Audio') {
        console.log('Es un audio, no se muestra');
      } else {
        this.openSiteSheet(feature.properties);
      }

      console.log(feature);
    });
    // Action - Load markers
    // this.map.on('load', event => {

    // });
  }
  setAdvertisementMarker() {
    //Show slider form
    this.showAdvertisementMarkerMenu = true;
    //Create marker
    const drawableMarker = new mapboxgl.Marker({
      draggable: true,
    })
      .setLngLat([this.lng, this.lat])
      .addTo(this.map);
  }
  formatLabel(value: number | null) {
    if (!value) {
      return 0;
    }
    if (value >= 100) {
      return value + 'm';
    }
    return value;
  }
}

@Component({
  selector: 'site-panel-sheet',
  templateUrl: 'site-panel-sheet.html',
})
export class SitePanelSheet implements OnInit {
  loading: boolean = false;
  audios: any;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<SitePanelSheet>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
  ) {}

  ngOnInit() {
    console.log('Iproperties', this.data);
  }
  getAudiosFromSite(id): void {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

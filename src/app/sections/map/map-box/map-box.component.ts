import { Component, OnInit, Inject } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
  MatBottomSheet,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from '@angular/material';
import * as MapboxCircle from 'mapbox-gl-circle';
import { MapService } from '../../../services/map.service';

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
  radius: number = 500;
  marker = new mapboxgl.Marker({
    draggable: true,
  });
  editableMarkerSite = new MapboxCircle(
    { lat: this.lat, lng: this.lng },
    this.radius,
    {
      editable: true,
      minRadius: 100,
      maxRadius: 5000,
      strokeWeight: 1,
      strokeOpacity: 0.85,
      fillColor: '#29AB87',
    }
  );
  // _getEditHandleDefaultPaintOptions cambiar estilo

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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        this.lat = position.coords.latitude;
        this.lng = position.coords.longitude;
        console.log(position.coords.latitude, position.coords.longitude);
      });
    }
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
    //Track control of user
    const geolocateUser = new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    });
    this.map.addControl(geolocateUser);
    //Trigger geolocation
    this.map.on('load', () => {
      geolocateUser.trigger();
    });

    // Action - when user press record
    this.map.on('click', event => {
      // Get point click and check if is a marker
      const features = this.map.queryRenderedFeatures(event.point, {
        layers: ['audios'],
      });
      this.placeAdvertisementMarker(); //test
      // If not is a marker return
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
    });
  }
  //Function to create announcement and place it
  placeAdvertisementMarker() {
    // Show menu
    this.showAdvertisementMarkerMenu = true;
    // Add marker announce to the map
    this.editableMarkerSite.addTo(this.map);
    // If radius changes, set property to template
    this.editableMarkerSite.on('radiuschanged', circleObj => {
      this.radius = circleObj.getRadius();
    });
  }
  //Function to save data from announcement
  saveAdvertisementMarker() {
    console.log(
      this.editableMarkerSite.getCenter(),
      this.editableMarkerSite.getRadius()
    );
    this.showAdvertisementMarkerMenu = false;
    this.editableMarkerSite.remove();
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

  ngOnInit() {}
  getAudiosFromSite(id): void {}

  openLink(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}

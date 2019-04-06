import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import * as mapboxgl from 'mapbox-gl';
import * as MapboxCircle from 'mapbox-gl-circle/lib/main.js';
import { ContextService } from '../../../../services/context.service';
import { Ad } from 'src/app/shared/models/Ad';
import { NumberReproductionsAdvertisementsComponent } from '../number-reproductions-advertisements/number-reproductions-advertisements.component';

@Component({
  selector: 'app-choose-ad-location',
  templateUrl: './choose-ad-location.component.html',
  styleUrls: ['./choose-ad-location.component.scss'],
})
export class ChooseAdLocationComponent implements OnInit {
  radius = 500;
  showAdvertisementMarkerMenu = false;
  editableMarkerSite: MapboxCircle;
  map: mapboxgl.Map;
  ad: Ad;

  constructor(
    private context: ContextService,
    protected dialog: MatDialog,
  ) {
    this.context.getIsMarkerAdVisible().subscribe(bool => {
      if (bool) {
        this.showAdLocationPicker();
      }
    });
  }

  ngOnInit() {}

  // Function to create announcement and place it
  showAdLocationPicker() {
    // Show menu
    this.showAdvertisementMarkerMenu = true;

    this.map = this.context.getMap().getValue();
    const center = this.map.getCenter();
    const config = this.context.getConfig().getValue();
    // Add marker announce to the map
    this.editableMarkerSite = new MapboxCircle(
      { lat: center.lat, lng: center.lng },
      this.radius,
      {
        editable: true,
        minRadius: config.minimumRadio,
        maxRadius: config.maximumRadio,
        strokeWeight: 2,
        strokeOpacity: 0.85,
        fillColor: '#29AB87',
        refineStroke: true,
      }
    );
    this.editableMarkerSite.addTo(this.map);

    // If radius changes, set property to template
    this.editableMarkerSite.on('radiuschanged', circleObj => {
      this.radius = circleObj.getRadius();
    });
  }
  // Function to save data from announcement
  saveAdvertisementMarker() {
    // Disable menu and editable circle
    this.showAdvertisementMarkerMenu = false;
    this.context.setIsMarkerAdVisible(false);

    this.ad = this.context.getAdEntity().getValue();

    const { lat, lng } = this.editableMarkerSite.getCenter();
    console.log('centro del marker', lat, lng)
    this.ad.latitude = lat;
    this.ad.longitude = lng;
    this.ad.radius = this.editableMarkerSite.getRadius();

    this.editableMarkerSite.remove();

    this.context.setAdEntity(this.ad);

    this.dialog
      .open(NumberReproductionsAdvertisementsComponent, {
        width: '350px',
      });
  }
  close() {
    this.showAdvertisementMarkerMenu = false;
    this.editableMarkerSite.remove();
    this.context.setIsRecorded(true);
    this.context.setIsMarkerAdVisible(false);
  }
}

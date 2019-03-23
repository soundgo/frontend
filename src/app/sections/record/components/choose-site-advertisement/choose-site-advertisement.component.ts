import { Component, OnInit } from '@angular/core';

import * as MapboxCircle from 'mapbox-gl-circle';

import { MapBoxComponent } from '../../../map/map-box/map-box.component';
import { MapService } from '../../../../services/map.service';
import { MatBottomSheet } from '@angular/material';

@Component({
  selector: 'app-choose-site-advertisement',
  templateUrl: './choose-site-advertisement.component.html',
  styleUrls: ['./choose-site-advertisement.component.scss'],
})
export class ChooseSiteAdvertisementComponent extends MapBoxComponent
  implements OnInit {
  radius: number = 500;
  showAdvertisementMarkerMenu: boolean = false;
  editableMarkerSite: MapboxCircle;

  constructor(
    protected mapService: MapService,
    protected bottomSheet: MatBottomSheet
  ) {
    super(mapService, bottomSheet);
  }

  ngOnInit() {}

  //Function to create announcement and place it
  placeAdvertisementMarker() {
    // Show menu
    this.showAdvertisementMarkerMenu = true;
    // Add marker announce to the map
    this.editableMarkerSite = new MapboxCircle(
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

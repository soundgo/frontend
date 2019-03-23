import {Component, OnInit} from '@angular/core';

import {MapBoxComponent} from '../../../map/map-box/map-box.component';
import {MatBottomSheet} from '@angular/material';


import * as MapboxCircle from 'mapbox-gl-circle';

@Component({
    selector: 'app-choose-ad-location',
    templateUrl: './choose-ad-location.component.html',
    styleUrls: ['./choose-ad-location.component.scss'],
})
export class ChooseAdLocationComponent extends MapBoxComponent implements OnInit {

    radius = 500;
    showAdvertisementMarkerMenu = false;
    editableMarkerSite: MapboxCircle;

    constructor(protected bottomSheet: MatBottomSheet) {
        super(bottomSheet);
        this.showAdLocationPicker();
    }

    ngOnInit() {
    }

    // Function to create announcement and place it
    showAdLocationPicker() {
        // Show menu
        this.showAdvertisementMarkerMenu = true;

        // Add marker announce to the map
        this.editableMarkerSite = new MapboxCircle(
            {lat: this.lat, lng: this.lng},
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

    // Function to save data from announcement
    saveAdvertisementMarker() {
        console.log(
            this.editableMarkerSite.getCenter(),
            this.editableMarkerSite.getRadius()
        );
        this.showAdvertisementMarkerMenu = false;
        this.editableMarkerSite.remove();
    }
}

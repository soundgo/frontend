import {Component, OnInit} from '@angular/core';

import {MapBoxComponent} from '../../../map/map-box/map-box.component';
import {MatBottomSheet, MatDialog} from '@angular/material';
import * as mapboxgl from 'mapbox-gl';

import * as MapboxCircle from '../../../../../assets/js/mapbox-gl-circle/lib/main.js';
import {ContextService} from '../../../../services/context.service';
import {Ad} from 'src/app/shared/models/Ad';
import {NumberReproductionsAdvertisementsComponent} from '../number-reproductions-advertisements/number-reproductions-advertisements.component';
import {ApiService} from '../../../../services/api.service';

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

    constructor(private context: ContextService, protected dialog: MatDialog, private api: ApiService) {
        this.map = this.context.getMap().getValue();
    }

    ngOnInit() {
        this.showAdLocationPicker();
    }

    // Function to create announcement and place it
    showAdLocationPicker() {
        // Show menu
        this.showAdvertisementMarkerMenu = true;

        const adEntity = this.context.getAdEntity().getValue();
        const currentPosition = this.context.getPosition().getValue();

        if (!adEntity.latitude) {
            adEntity.latitude = currentPosition.latitude;
            adEntity.longitude = currentPosition.longitude;
            this.context.setAdEntity(adEntity);
        }

        // Add marker announce to the map
        this.editableMarkerSite = new MapboxCircle(
            {lat: adEntity.latitude, lng: adEntity.longitude},
            this.radius,
            {
                editable: true,
                minRadius: 100,
                maxRadius: 5000,
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
        //Disable menu and editable circle
        this.showAdvertisementMarkerMenu = false;
        this.editableMarkerSite.remove();

        this.ad = this.context.getAdEntity().getValue();

        const {lat, lng} = this.editableMarkerSite.getCenter();
        this.ad.latitude = lat;
        this.ad.longitude = lng;

        const radius = this.editableMarkerSite.getRadius();
        this.ad.radius = radius;

        this.context.setAdEntity(this.ad);

        this.dialog.open(NumberReproductionsAdvertisementsComponent, {
            width: '350px',
        }).afterClosed().subscribe(_ => {
            this.api.createAd(this.context.getAdEntity().getValue()).then(response => {
                console.log('createAd:', response);
            });
        });

    }

}

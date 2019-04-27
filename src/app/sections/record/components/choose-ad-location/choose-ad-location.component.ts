import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';

import * as mapboxgl from 'mapbox-gl';
import * as MapboxCircle from 'mapbox-gl-circle/lib/main.js';
import {ContextService} from '../../../../services/context.service';
import {Ad} from 'src/app/shared/models/Ad';
import {NumberReproductionsAdvertisementsComponent} from '../number-reproductions-advertisements/number-reproductions-advertisements.component';
import * as MapboxDraw from '@mapbox/mapbox-gl-draw';
import {CircleMode, DirectMode, SimpleSelectMode} from 'mapbox-gl-draw-circle';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-choose-ad-location',
    templateUrl: './choose-ad-location.component.html',
    styleUrls: ['./choose-ad-location.component.scss'],
})
export class ChooseAdLocationComponent implements OnInit, OnDestroy {
    radius: any = 0;
    maxRadius: any = 5000;
    center: any;
    showAdvertisementMarkerMenu = false;
    editableMarkerSite: MapboxCircle;
    draw: any;
    map: mapboxgl.Map;
    ad: Ad;
    subscription = new Subscription();

    constructor(
        private context: ContextService,
        protected dialog: MatDialog,
    ) {
        this.subscription = this.context.getIsMarkerAdVisible().subscribe(bool => {
            if (bool) {
                this.showAdLocationPicker();
            } else {
                if (!this.context.getIsMarkerAdVisible()) {
                    this.close();
                }
            }
        });
        this.maxRadius = this.context.getConfig().getValue().maximumRadio;
    }

    ngOnInit() {
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    showAdLocationPicker() {
        // Show menu
        this.showAdvertisementMarkerMenu = true;

        this.map = this.context.getMap().getValue();
        // Add marker announce to the map
        this.draw = new MapboxDraw({
            defaultMode: 'draw_circle',
            userProperties: true,
            displayControlsDefault: false,
            modes: {
                ...MapboxDraw.modes,
                draw_circle: CircleMode,
                direct_select: DirectMode,
                simple_select: SimpleSelectMode
            }
        });

        this.map.addControl(this.draw);

        this.draw.changeMode('draw_circle', {initialRadiusInKm: 0.1});
        this.map.on('draw.create', e => {
            this.center = e.features[0].properties.center;
            this.radius = Math.round(e.features[0].properties.radiusInKm * 1000);
        });
        this.map.on('draw.update', e => {
            this.center = e.features[0].properties.center;
            this.radius = Math.round(e.features[0].properties.radiusInKm * 1000);
        });

    }

    // Function to save data from announcement
    saveAdvertisementMarker() {
        // Disable menu and editable circle
        this.showAdvertisementMarkerMenu = false;
        this.context.setIsMarkerAdVisible(false);

        this.ad = this.context.getAdEntity().getValue();

        this.ad.longitude = this.center[0];
        this.ad.latitude = this.center[1];
        this.ad.radius = this.radius;

        try {
            this.map.removeControl(this.draw);
        } catch (e) {
            console.log(e);
        }

        this.context.setAdEntity(this.ad);

        this.dialog
            .open(NumberReproductionsAdvertisementsComponent, {
                width: '350px',
            });
        this.radius = 0;
    }

    close() {
        this.radius = 0;
        this.showAdvertisementMarkerMenu = false;
        if (this.draw) {
            this.map.removeControl(this.draw);
        }
        this.context.setIsRecorded(true);
        this.context.setIsMarkerAdVisible(false);
    }
}

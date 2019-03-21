import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { MapService } from '../../../services/map.service';
import { GeoJson, FeatureCollection } from '../../../shared/models/Map';

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

  // data
  markers: any;
  source: any;

  constructor(private mapService: MapService) {}

  ngOnInit() {
    this.markers = this.mapService.getMarkers();
    this.initializeMap();
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
      const features = this.map.queryRenderedFeatures(event.point, {
        layers: ['audios'],
      });
      if (!features.length) {
        return;
      }
      const feature = features[0];

      console.log(feature);
    });
    // Action - Load markers
    this.map.on('load', event => {
      // Register source
      // this.map.addSource('markers', {
      //   type: 'geojson',
      //   data: {
      //     type: 'FeatureCollection',
      //     features: [],
      //   },
      // });
      // Get source
      // this.source = this.map.getSource('markers');
      // /// subscribe to realtime database and set data source
      // let data = new FeatureCollection(this.markers);
      // this.source.setData(data);
      // /// create map layers with realtime data
      // this.map.addLayer({
      //   id: 'markers',
      //   source: 'markers',
      //   type: 'symbol',
      //   layout: {
      //     'text-field': '{type}',
      //     'text-size': 12,
      //     'text-transform': 'uppercase',
      //     'icon-image': 'ro-communal-2',
      //     'text-offset': [0, 1.5],
      //   },
      //   paint: {
      //     'text-color': 'purple',
      //     'text-halo-width': 2,
      //   },
      // });
    });
  }
}

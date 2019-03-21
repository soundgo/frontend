import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { GeoJson } from '../shared/models/Map';
import * as mapboxgl from 'mapbox-gl';

@Injectable()
export class MapService {
  data = [
    {
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [-5.982, 37.373],
      },
      properties: {
        type: 'Audio',
      },
    },
    {},
  ];

  constructor() {
    mapboxgl.accessToken = environment.mapbox.accessToken;
  }
  array: any;

  getMarkers() {
    return this.data;
  }

  createMarker(data: GeoJson) {
    console.log(data);
    return this.array.push(data);
  }

  // removeMarker($key: string) {
  //   return this.db.object('/markers/' + $key).remove()
  // }
}

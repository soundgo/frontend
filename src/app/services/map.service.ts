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

  createGeoJSONCircle(center, radiusInKm, points?) {
    if (!points) points = 64;

    var coords = {
      latitude: center[1],
      longitude: center[0],
    };

    var km = radiusInKm;

    const ret = [];
    const distanceX = km / (111.32 * Math.cos((coords.latitude * Math.PI) / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
      theta = (i / points) * (2 * Math.PI);
      x = distanceX * Math.cos(theta);
      y = distanceY * Math.sin(theta);

      ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [
          {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [ret],
            },
          },
        ],
      },
    };
  }

  // removeMarker($key: string) {
  //   return this.db.object('/markers/' + $key).remove()
  // }
}

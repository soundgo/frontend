import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

import { AngularFirestore } from '@angular/fire/firestore';
import { Map } from 'mapbox-gl';

import { GeoJson } from '../shared/models/Map';

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

  constructor(private db: AngularFirestore) {
  }
  array: any;

  getMarkers() {
    return this.db.collection('audios')
  }

  createAudioMarker(data: GeoJson) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('audios').add(
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [data.geometry.coordinates[0], data.geometry.coordinates[1]],
          },
          properties: {
            type: data.properties.type,
          },
        })
        .then(res => { }, err => reject(err))
    })
  }

  createSiteMarker(data: GeoJson) {
    return new Promise<any>((resolve, reject) => {
      this.db.collection('sites').add(
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [data.geometry.coordinates[0], data.geometry.coordinates[1]],
          },
          properties: {
            id: data.properties.id,
            name: data.properties.name,
          },
        })
        .then(res => { }, err => reject(err))
    })
  }

  removeMarker(id: string) {
    return this.db.collection('audios').doc(id).delete();
  }

}

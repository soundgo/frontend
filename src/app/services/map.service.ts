import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
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
  }
  array: any;

 

}

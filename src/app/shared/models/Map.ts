// ======== Interfaces ========
export interface IGeoJson {
  type: string;
  geometry: IGeometry;
  properties: IPropeties;
  $key?: string;
}

export interface IGeometry {
  type: string;
  coordinates: number[];
}

export interface IPropeties {
  type: string;
  id: string;
  numerReproductions?: number;
  path?: string;
  // Audio
  isInappropiate?: boolean;
  timestampCreation?: Date;
  timestampFinish?: Date;
  // Announcement
  maxPriceToPay?: number;
  radio?: number;
  isActive?: boolean;
  isDelete?: boolean;
  // Site
  name?: string;
}

// ======== Classes ========
// Class one Marker
export class GeoJson implements IGeoJson {
  type = 'Feature';
  geometry: IGeometry;
  properties: IPropeties;

  constructor(coordinates, dataProperties) {
    this.geometry = {
      type: 'Point',
      coordinates: coordinates,
    };
    this.properties = dataProperties;
  }
}
// Class all markers
export class FeatureCollection {
  type = 'FeatureCollection';
  constructor(public features: Array<GeoJson>) {}
}

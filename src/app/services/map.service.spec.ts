import { TestBed } from '@angular/core/testing';

import { MapService } from './map.service';
import { CookieService } from 'ngx-cookie-service';

describe('MapService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CookieService]
  }));

  it('should be created', () => {
    const service: MapService = TestBed.get(MapService);
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { ApiService } from './api.service';

import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

describe('ApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({ 
    imports: [HttpClientModule],
    providers: [CookieService]
   }));

  it('should be created', () => {
    const service: ApiService = TestBed.get(ApiService);
    expect(service).toBeTruthy();
  });
});

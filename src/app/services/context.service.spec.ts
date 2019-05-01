import { TestBed } from '@angular/core/testing';

import { ContextService } from './context.service';
import { CookieService } from 'ngx-cookie-service';

describe('ContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CookieService]
  }));

  it('should be created', () => {
    const service: ContextService = TestBed.get(ContextService);
    expect(service).toBeTruthy();
  });
});

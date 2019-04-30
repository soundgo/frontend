import { TestBed } from '@angular/core/testing';

import { AudioRecordService } from './audio-record.service';
import { CookieService } from 'ngx-cookie-service';

describe('AudioRecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [CookieService]
  }));

  it('should be created', () => {
    const service: AudioRecordService = TestBed.get(AudioRecordService);
    expect(service).toBeTruthy();
  });
});

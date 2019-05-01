import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioRecordComponent } from './audio-record.component';
import { CookieService } from 'ngx-cookie-service';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

describe('AudioRecordComponent', () => {
  let component: AudioRecordComponent;
  let fixture: ComponentFixture<AudioRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AudioRecordComponent],
      imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
      ],
      providers: [CookieService,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        },]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

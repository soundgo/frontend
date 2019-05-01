import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAudioComponent } from './edit-audio.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('EditAudioComponent', () => {
  let component: EditAudioComponent;
  let fixture: ComponentFixture<EditAudioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditAudioComponent ],
      imports: [
        CommonModule,
        MaterialModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
      ],
      providers: [CookieService,
        ApiService,
        { provide: MatDialogRef, useValue: {} },
        {
          provide: MAT_DIALOG_DATA, useValue: {}
        },]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditAudioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   component.tags = ['betis'];
  //   component.audio = new Audio();
  //   component.tagInput = Object.create({})
  //   fixture.detectChanges();
  //   expect(component).toBeTruthy();
  // });
});

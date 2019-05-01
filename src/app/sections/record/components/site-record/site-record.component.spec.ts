import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteRecordComponent } from './site-record.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material';
import { ApiService } from 'src/app/services/api.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReproducerButtonComponent } from 'src/app/shared/components/reproducer-button/reproducer-button.component';

describe('SiteRecordComponent', () => {
  let component: SiteRecordComponent;
  let fixture: ComponentFixture<SiteRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SiteRecordComponent,
      ReproducerButtonComponent ],
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
    fixture = TestBed.createComponent(SiteRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

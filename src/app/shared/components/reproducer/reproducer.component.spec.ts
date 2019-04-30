import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReproducerComponent } from './reproducer.component';

import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { ShowcaseComponent } from "src/app/shared/components/showcase/showcase.component";

import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { CookieService } from 'ngx-cookie-service';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { Audio } from '../../models/Audio';

describe('reproduccerComponent', () => {
  let component: ReproducerComponent;
  let fixture: ComponentFixture<ReproducerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReproducerComponent, ShowcaseComponent ],
      imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
      ],
      providers: [CookieService,
        { provide: MatBottomSheetRef, useValue: {} },
        {
          provide: MAT_BOTTOM_SHEET_DATA, useValue: {}
        },],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReproducerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    component.record = new Audio();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});

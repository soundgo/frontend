import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSearchComponent } from './site-search.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';


describe('SiteSearchComponent', () => {
  let component: SiteSearchComponent;
  let fixture: ComponentFixture<SiteSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SiteSearchComponent,
      ],
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
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

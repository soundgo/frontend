import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagPanelSheetComponent } from './tag-panel-sheet.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

describe('TagPanelSheetComponent', () => {
  let component: TagPanelSheetComponent;
  let fixture: ComponentFixture<TagPanelSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagPanelSheetComponent ],
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
    fixture = TestBed.createComponent(TagPanelSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

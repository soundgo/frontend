import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudioReproducerPanelComponent } from './audio-reproducer-panel.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from 'src/app/material.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RecordModule } from '../../record/record.module';
import { PlyrModule } from 'ngx-plyr';
import { MapBoxComponent } from '../map-box/map-box.component';
import { SitePanelSheetComponent } from '../site-panel-sheet/site-panel-sheet.component';
import { CreateSiteComponent } from '../create-site/create-site.component';
import { AdReproducerPanelComponent } from '../ad-reproducer-panel/ad-reproducer-panel.component';
import { TagPanelSheetComponent } from '../tag-panel-sheet/tag-panel-sheet.component';
import { SiteSearchComponent } from '../site-search/site-search.component';
import { CookieService } from 'ngx-cookie-service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material';

describe('AudioReproducerPanelComponent', () => {
  let component: AudioReproducerPanelComponent;
  let fixture: ComponentFixture<AudioReproducerPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AudioReproducerPanelComponent,
        MapBoxComponent,
        SitePanelSheetComponent,
        CreateSiteComponent,
        AdReproducerPanelComponent,
        TagPanelSheetComponent,
        SiteSearchComponent],
      imports: [
        CommonModule,
        SharedModule,
        MaterialModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        RecordModule,
        PlyrModule,
      ],
      providers: [CookieService,
        { provide: MatBottomSheetRef, useValue: {} },
        {
          provide: MAT_BOTTOM_SHEET_DATA, useValue: {
            properties: {
              id: '',
              actorId: ''
            }
          }
        },],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudioReproducerPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

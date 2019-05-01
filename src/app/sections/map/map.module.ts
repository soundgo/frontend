import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';

import { MaterialModule } from '../../material.module';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SitePanelSheetComponent } from './site-panel-sheet/site-panel-sheet.component';
import { RecordModule } from '../record/record.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { CreateSiteComponent } from './create-site/create-site.component';
import { PlyrModule } from 'ngx-plyr';
import { SharedModule } from '../../shared/shared.module';
import { AudioReproducerPanelComponent } from './audio-reproducer-panel/audio-reproducer-panel.component';
import { MapBoxComponent } from './map-box/map-box.component';
import { AdReproducerPanelComponent } from './ad-reproducer-panel/ad-reproducer-panel.component';
import { AccountModule } from '../account/account.module';
import { TagPanelSheetComponent } from './tag-panel-sheet/tag-panel-sheet.component';
import { SiteSearchComponent } from './site-search/site-search.component';

const components = [
  MapBoxComponent,
  SitePanelSheetComponent,
  CreateSiteComponent,
  AudioReproducerPanelComponent,
  AdReproducerPanelComponent,
  TagPanelSheetComponent,
  SiteSearchComponent
];

@NgModule({
  declarations: [...components],
  entryComponents: [
    SitePanelSheetComponent,
    TagPanelSheetComponent,
    AudioReproducerPanelComponent,
    AdReproducerPanelComponent,
    CreateSiteComponent,
    SiteSearchComponent
  ], // inside we put the modalComponent
  imports: [
    CommonModule,
    SharedModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RecordModule,
    PlyrModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyCWP0GCy7NY5EQ3h6AmegW8MfB0Xc96f3Y",
      authDomain: "soundgo-a0f55.firebaseapp.com",
      databaseURL: "https://soundgo-a0f55.firebaseio.com",
      projectId: "soundgo-a0f55",
      storageBucket: "soundgo-a0f55.appspot.com",
      messagingSenderId: "359290080223"
    }),
    AngularFirestoreModule,
  ],
  exports: [
    TranslateModule,
    ...components],
})
export class MapModule {}

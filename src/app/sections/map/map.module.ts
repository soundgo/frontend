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

const components = [
  MapBoxComponent,
  SitePanelSheetComponent,
  CreateSiteComponent,
  AudioReproducerPanelComponent,
  AdReproducerPanelComponent,
  TagPanelSheetComponent,
];

@NgModule({
  declarations: [...components],
  entryComponents: [
    SitePanelSheetComponent,
    TagPanelSheetComponent,
    AudioReproducerPanelComponent,
    AdReproducerPanelComponent,
    CreateSiteComponent,
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
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    AngularFireModule.initializeApp({
      apiKey: 'AIzaSyCV4BLaYb1IRNXuIDgRXfShJUJmlA-RZMk',
      authDomain: 'soundgo-aec9e.firebaseapp.com',
      databaseURL: 'https://soundgo-aec9e.firebaseio.com',
      projectId: 'soundgo-aec9e',
      storageBucket: 'soundgo-aec9e.appspot.com',
      messagingSenderId: '782732124872',
    }),
    AngularFirestoreModule,
  ],
  exports: [...components],
})
export class MapModule {}

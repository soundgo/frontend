import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.module';

import { MaterialModule } from '../../material.module';

import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { MapBoxComponent } from './map-box/map-box.component';
import { SitePanelSheetComponent } from './site-panel-sheet/site-panel-sheet.component';
import { RecordModule } from '../record/record.module';

const components = [MapBoxComponent, SitePanelSheetComponent];

@NgModule({
  declarations: [...components],
  entryComponents: [SitePanelSheetComponent], // inside we put the modalComponent
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MaterialModule,
    RecordModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
  ],
  exports: [...components],
})
export class MapModule {}

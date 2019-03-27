
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
import { MapComponent } from './mapbox/mapbox.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../../../environments/environment';
import { CreateSiteComponent } from './create-site/create-site.component';
import {PlyrModule} from 'ngx-plyr';

const components = [MapComponent, SitePanelSheetComponent, CreateSiteComponent];

@NgModule({
    declarations: [...components],
    entryComponents: [SitePanelSheetComponent, CreateSiteComponent], // inside we put the modalComponent
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        RecordModule,
        PlyrModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient],
            },
        }),
        NgxMapboxGLModule.withConfig({
            accessToken: `${environment.mapbox.accessToken}`
        }),
        AngularFireModule.initializeApp(environment.firebase),
        AngularFirestoreModule
    ],
    exports: [...components],
})
export class MapModule { }

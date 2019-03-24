import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';

import {HttpClientModule, HttpClient} from '@angular/common/http';
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

import {
    MapBoxComponent
} from './sections/map/map-box/map-box.component';
NumberReproductionsAdvertisementsComponent
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';

import {RecordModule} from './sections/record/record.module';
import {SitePanelSheetComponent} from './sections/map/site-panel-sheet/site-panel-sheet.component';

import {FormsModule} from '@angular/forms';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MapBoxComponent, SitePanelSheet} from './sections/map/map-box/map-box.component';
import {RecordModule} from './sections/record/record.module';

export function HttpLoaderFactory(http: HttpClient) {
    return new TranslateHttpLoader(http);
}

@NgModule({
    declarations: [AppComponent, MapBoxComponent, SitePanelSheetComponent],
    entryComponents: [SitePanelSheetComponent], // inside we put the modalComponent
    imports: [
        BrowserModule,
        AppRoutingModule,
        SharedModule,
        HttpClientModule,
        FormsModule,
        BrowserAnimationsModule,
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
    bootstrap: [AppComponent],
})
export class AppModule {
}

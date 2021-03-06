import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';

import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { AppComponent } from './app.component';
import { MapModule } from './sections/map/map.module';
import { RecordModule } from './sections/record/record.module';
import { HeaderComponent } from './components/header/header.component';
import { TimeLeftComponent } from './components/header/components/time-left/time-left.component';
import { CategoryPickerComponent } from './components/header/components/category-picker/category-picker.component';
import { MenuComponent } from './components/header/components/menu/menu.component';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { AccountModule } from './sections/account/account.module';
import { CookieService } from 'ngx-cookie-service';
import { NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { TimeLeftModalComponent } from './components/header/components/time-left-modal/time-left-modal.component';
import { CommonModule } from '@angular/common';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TimeLeftComponent,
    MenuComponent,
    CategoryPickerComponent,
    TimeLeftModalComponent,
  ],
  entryComponents: [TimeLeftModalComponent],
  providers: [CookieService],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ],
  imports: [
    CommonModule,
    BrowserModule,
    SharedModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    RecordModule,
    AccountModule,
    MapModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    NgxMapboxGLModule.withConfig({
      accessToken: `${environment.mapbox.accessToken}`,
    }),
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyB8gV_uBNgfAH3GNZdaUq_Ji8Jhz-D5uJo",
      authDomain: "soundgo-94882.firebaseapp.com",
      databaseURL: "https://soundgo-94882.firebaseio.com",
      projectId: "soundgo-94882",
      storageBucket: "soundgo-94882.appspot.com",
      messagingSenderId: "317072381464"
    }),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}

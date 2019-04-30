import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { ErrorsManagementComponent } from 'src/app/shared/components/errors-management/errors-management.component';
import { HeaderComponent } from 'src/app/components/header/header.component';
import { AudioRecordComponent } from 'src/app/sections/record/components/audio-record/audio-record.component';
import { AdRecordComponent } from 'src/app/sections/record/components/ad-record/ad-record.component';
import { MapBoxComponent } from 'src/app/sections/map/map-box/map-box.component';
import { RecordComponent } from 'src/app/sections/record/components/record/record.component';
import { ChooseAdLocationComponent } from 'src/app/sections/record/components/choose-ad-location/choose-ad-location.component';
import { TimeLeftComponent } from 'src/app/components/header/components/time-left/time-left.component';
import { CategoryPickerComponent } from 'src/app/components/header/components/category-picker/category-picker.component';
import { MenuComponent } from 'src/app/components/header/components/menu/menu.component';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ReproducerButtonComponent } from 'src/app/shared/components/reproducer-button/reproducer-button.component';
import { MatProgressBarModule, MatIconModule, MatDialogModule } from '@angular/material';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { SharedModule } from './shared/shared.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { RecordModule } from './sections/record/record.module';
import { AccountModule } from './sections/account/account.module';
import { MapModule } from './sections/map/map.module';
import { HttpLoaderFactory } from './app.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxMapboxGLModule } from 'ngx-mapbox-gl';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire';
import { TimeLeftModalComponent } from './components/header/components/time-left-modal/time-left-modal.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
      declarations: [
        AppComponent,
        HeaderComponent,
        TimeLeftComponent,
        MenuComponent,
        CategoryPickerComponent,
        TimeLeftModalComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  // it(`should have as title 'SoundGo'`, () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app.title).toEqual('SoundGo');
  // });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to frontend!');
  // });
});

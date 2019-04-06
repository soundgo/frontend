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
import { TimeLeftComponent } from 'src/app/components/header/components/time-left/time-left.component' ;
import { CategoryPickerComponent } from 'src/app/components/header/components/category-picker/category-picker.component';
import { MenuComponent } from 'src/app/components/header/components/menu/menu.component';
import { TranslateModule } from '@ngx-translate/core';
import { ReproducerButtonComponent } from 'src/app/shared/components/reproducer-button/reproducer-button.component';
import { MatProgressBarModule, MatIconModule,MatDialogModule } from '@angular/material';
import { NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'; 

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        TranslateModule,
        MatProgressBarModule,
        MatIconModule,
        MatDialogModule,
        HttpClientTestingModule,
      ],
      declarations: [
        AppComponent,
        ErrorsManagementComponent,
        HeaderComponent,
        AudioRecordComponent,
        AdRecordComponent,
        MapBoxComponent,
        RecordComponent,
        ChooseAdLocationComponent,
        TimeLeftComponent,
        CategoryPickerComponent,
        MenuComponent,
        ReproducerButtonComponent,
      ],
      schemas: [NO_ERRORS_SCHEMA, CUSTOM_ELEMENTS_SCHEMA]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('frontend');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to frontend!');
  });
});

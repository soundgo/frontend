import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AudioRecordComponent} from './components/audio-record/audio-record.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../app.module';
import {ChooseAudioCategoryComponent} from './components/choose-audio-category/choose-audio-category.component';
import {AdRecordComponent} from './components/ad-record/ad-record.component';
import {ChooseAudioAdvertisementComponent} from './components/choose-audio-advertisement/choose-audio-advertisement.component';

import {MaterialModule} from '../../material.module';

import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {ChooseAdLocationComponent} from './components/choose-ad-location/choose-ad-location.component';
import {SiteRecordComponent} from './components/site-record/site-record.component';
import {
    NumberReproductionsAdvertisementsComponent
} from './components/number-reproductions-advertisements/number-reproductions-advertisements.component';
import {MatInputModule} from '@angular/material';
import { RecordComponent } from './components/record/record.component';
import {SharedModule} from '../../shared/shared.module';
import { EditAudioComponent } from './components/edit-audio/edit-audio.component';

const components = [
    RecordComponent,
    AudioRecordComponent,
    AdRecordComponent,
    ChooseAudioCategoryComponent,
    ChooseAudioAdvertisementComponent,
    ChooseAdLocationComponent,
    SiteRecordComponent,
    NumberReproductionsAdvertisementsComponent,
    EditAudioComponent
];

@NgModule({
    declarations: [...components],
    entryComponents: [
        ChooseAudioCategoryComponent,
        ChooseAudioAdvertisementComponent,
        NumberReproductionsAdvertisementsComponent,
        EditAudioComponent
    ], // inside we put the modalComponent
    imports: [
        CommonModule,
        HttpClientModule,
        MatInputModule,
        ReactiveFormsModule,
        FormsModule,
        MaterialModule,
        SharedModule,
    ],
    exports: [
        TranslateModule,
        ...components],
})
export class RecordModule {
}

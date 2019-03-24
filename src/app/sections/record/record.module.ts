import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AudioRecordComponent} from './components/audio-record/audio-record.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../app.module';
import {ChooseAudioCategoryComponent} from './components/choose-audio-category/choose-audio-category.component';
import {AdRecordComponent} from './components/ad-record/ad-record.component';
import {ChooseAudioAdvertisementComponent} from './components/choose-audio-advertisement/choose-audio-advertisement.component';


import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {
    ChooseAdLocationComponent
} from './components/choose-ad-location/choose-ad-location.component';
import { SiteRecordComponent } from './components/site-record/site-record.component';

const components = [
    AudioRecordComponent,
    AdRecordComponent,
    ChooseAudioCategoryComponent,
    ChooseAudioAdvertisementComponent,
    ChooseAdLocationComponent,
    SiteRecordComponent
];

@NgModule({
    declarations: [...components],
    entryComponents: [ChooseAudioCategoryComponent, ChooseAudioAdvertisementComponent], // inside we put the modalComponent
    imports: [
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        }),
    ],
    exports: [
        ...components
    ]
})
export class RecordModule {
}

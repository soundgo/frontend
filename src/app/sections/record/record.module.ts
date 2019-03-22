import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AudioRecordComponent} from './components/audio-record/audio-record.component';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpLoaderFactory} from '../../app.module';
import {ChooseAudioCategoryComponent} from './components/choose-audio-category/choose-audio-category.component';
import { AdRecordComponent } from './components/ad-record/ad-record.component';

const components = [AudioRecordComponent, ChooseAudioCategoryComponent, AdRecordComponent];

@NgModule({
    declarations: [...components],
    entryComponents: [ChooseAudioCategoryComponent], // inside we put the modalComponent
    imports: [
        CommonModule,
        HttpClientModule,
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

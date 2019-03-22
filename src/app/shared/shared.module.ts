import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './components/button/button.component';
import {ReproduccerComponent} from './components/reproduccer/reproduccer.component';
import {RecorderComponent} from './components/recorder/recorder.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpLoaderFactory} from '../app.module';

const components = [
    ButtonComponent,
    ReproduccerComponent,
    RecorderComponent
];

@NgModule({
    declarations: [...components],
    entryComponents: [RecorderComponent],
    imports: [
        CommonModule,
        HttpClientModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        ...components
    ]
})
export class SharedModule {
}

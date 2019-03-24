import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './components/button/button.component';
import {ReproduccerComponent} from './components/reproduccer/reproduccer.component';
import {RecorderComponent} from './components/recorder/recorder.component';
import {ErrorsManagementComponent} from './components/errors-management/errors-management.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpLoaderFactory} from '../app.module';

import {MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material';

const components = [
    ButtonComponent,
    ReproduccerComponent,
    RecorderComponent,
    ErrorsManagementComponent
];

@NgModule({
    declarations: [...components],
    providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 7000}}], // duration in seconds of the snackbar
    entryComponents: [RecorderComponent, ErrorsManagementComponent],
    imports: [
        CommonModule,
        MatSnackBarModule,
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

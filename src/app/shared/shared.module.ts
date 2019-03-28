import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ButtonComponent} from './components/button/button.component';
import {ReproducerComponent} from './components/reproducer/reproducer.component';
import {RecorderComponent} from './components/recorder/recorder.component';
import {ErrorsManagementComponent} from './components/errors-management/errors-management.component';
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {HttpLoaderFactory} from '../app.module';

import {MatSnackBar, MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarModule} from '@angular/material';
import {ClickOutsideModule} from 'ng-click-outside';
import {PlyrModule} from 'ngx-plyr';
import {MaterialModule} from '../material.module';

const components = [
    ButtonComponent,
    ReproducerComponent,
    RecorderComponent,
    ErrorsManagementComponent,
    ReproducerComponent
];

@NgModule({
    declarations: [...components],
    providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 7000}}], // duration in seconds of the snackbar
    entryComponents: [RecorderComponent, ErrorsManagementComponent, ReproducerComponent],
    imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
        PlyrModule,
        ClickOutsideModule,
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

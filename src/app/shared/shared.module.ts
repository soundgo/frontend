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
import {PlyrModule} from 'ngx-plyr';
import {MaterialModule} from '../material.module';
import { ShowcaseComponent } from './components/showcase/showcase.component';
import {CreateSiteComponent} from '../sections/map/create-site/create-site.component';
import { ReproducerButtonComponent } from './components/reproducer-button/reproducer-button.component';

const components = [
    ButtonComponent,
    ReproducerComponent,
    RecorderComponent,
    ErrorsManagementComponent,
    ReproducerComponent,
    ShowcaseComponent
];

@NgModule({
    declarations: [...components, ReproducerButtonComponent],
    providers: [{provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 7000}}], // duration in seconds of the snackbar
    entryComponents: [RecorderComponent, ErrorsManagementComponent, ReproducerComponent, CreateSiteComponent],
    imports: [
        CommonModule,
        MaterialModule,
        HttpClientModule,
        PlyrModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
            }
        })
    ],
    exports: [
        ...components,
        ReproducerButtonComponent
    ]
})
export class SharedModule {
}

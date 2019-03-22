import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AudioRecordComponent} from './components/audio-record/audio-record.component';

const recordRoutes: Routes = [
    {path: '/user', component: AudioRecordComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(recordRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}

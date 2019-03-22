import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AudioRecordComponent} from './sections/record/components/audio-record/audio-record.component';
import {AdRecordComponent} from './sections/record/components/ad-record/ad-record.component';

const routes: Routes = [
  {path: 'user', component: AudioRecordComponent},
  {path: 'ad', component: AdRecordComponent},
  {path: '', component: AudioRecordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

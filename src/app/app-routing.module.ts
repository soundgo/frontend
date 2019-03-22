import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AudioRecordComponent} from './sections/record/components/audio-record/audio-record.component';

const routes: Routes = [
  {path: 'user', component: AudioRecordComponent},
  {path: '', component: AudioRecordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

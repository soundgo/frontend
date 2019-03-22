import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AudioRecordComponent} from './sections/record/components/audio-record/audio-record.component';
import {ChooseAudioCategoryComponent} from './sections/record/components/choose-audio-category/choose-audio-category.component';

const routes: Routes = [
  {path: 'user', component: AudioRecordComponent},
  {path: 'user/choose-category', component: ChooseAudioCategoryComponent},
  {path: '', component: AudioRecordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

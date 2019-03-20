import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ReproduccerComponent } from './components/reproduccer/reproduccer.component';

const components = [
  ButtonComponent,
  ReproduccerComponent
];

@NgModule({
  declarations: [...components],
  imports: [
    CommonModule
  ],
  exports: [
      ...components
  ]
})
export class SharedModule { }

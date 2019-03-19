import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';

const components = [
  ButtonComponent
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

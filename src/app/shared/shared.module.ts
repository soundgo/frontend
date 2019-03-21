import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from './components/button/button.component';
import { ErrorsManagementComponent } from './components/errors-management/errors-management.component';

const components = [
  ButtonComponent
];

@NgModule({
  declarations: [...components, 
    ErrorsManagementComponent],
  imports: [
    CommonModule
  ],
  exports: [
      ...components
  ]
})
export class SharedModule { }

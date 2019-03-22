import { NgModule } from '@angular/core';

import {
  MatDialogModule,
  MatFormFieldModule,
  MatButtonModule,
  MatInputModule,
  MatBottomSheetModule,
  MatListModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { FormsModule } from '@angular/forms';

@NgModule({
  exports: [
    FormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatBottomSheetModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
})
export class MaterialModule {}

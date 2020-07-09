import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';

const MaterialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule
];

@NgModule({
  imports:
    MaterialComponents
  ,
  exports:
    MaterialComponents
})
export class MaterialModule { }

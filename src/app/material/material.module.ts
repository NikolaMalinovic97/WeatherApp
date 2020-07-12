import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';


const MaterialComponents = [
  MatButtonModule,
  MatFormFieldModule,
  MatDialogModule,
  MatInputModule,
  MatAutocompleteModule,
  FormsModule
];

@NgModule({
  imports:
    MaterialComponents
  ,
  exports:
    MaterialComponents
})
export class MaterialModule { }

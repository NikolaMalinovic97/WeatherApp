import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-weather-dialog',
  templateUrl: './weather-dialog.component.html',
  styleUrls: ['./weather-dialog.component.scss']
})
export class WeatherDialogComponent implements OnInit {

  locationForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<WeatherDialogComponent>, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    const LATITUDE = '^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$';
    const LONGITUDE = '^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$';

    this.locationForm = this.formBuilder.group({
      latitude: ['', [Validators.required, Validators.pattern(LATITUDE)]],
      longitude: ['', [Validators.required, Validators.pattern(LONGITUDE)]]
    });
  }

  onSubmit(): any {
    this.dialogRef.close(this.locationForm.value);
  }

}

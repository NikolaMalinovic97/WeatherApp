/// <reference types="@types/googlemaps" />
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GoogleLocationService } from '../service/google-location.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-weather-dialog',
  templateUrl: './weather-dialog.component.html',
  styleUrls: ['./weather-dialog.component.scss']
})
export class WeatherDialogComponent implements OnInit {

  locationForm: FormGroup;
  options: string[] = [];
  filteredOptions: Observable<string[]>;

  constructor(
    public dialogRef: MatDialogRef<WeatherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private googleLocationService: GoogleLocationService
  ) { }

  ngOnInit(): void {
    this.locationForm = this.createLocationForm();
  }

  onLocationKeyUp(): any {
    this.updatePredictionOptions();
  }

  onOptionSelect(event): void {
    this.locationForm.get('location').setValue(event.source.value);
    this.updatePredictionOptions();
    const location = this.locationForm.get('location').value;
    this.updateCoordinates(location);
  }

  updatePredictionOptions(): void {
    const locationValue = this.locationForm.get('location').value;
    this.googleLocationService.getAutocompleteOptions(locationValue).then(data => {
      const predictions: [] = data.predictions;
      this.options = [];
      predictions.forEach((e: any) => {
        this.options.push(e.description);
      });
    });
  }

  async updateCoordinates(location: string): Promise<void> {
    if (location !== '') {
      const coordinates = await this.googleLocationService.getCoordinatesByLocation(location);
      this.locationForm.get('latitude').setValue(coordinates.lat);
      this.locationForm.get('longitude').setValue(coordinates.lng);
    }
  }

  async onSubmit(): Promise<void> {
    await this.updateLocation();
    this.dialogRef.close(this.locationForm.value);
  }

  async updateLocation(): Promise<void> {
    if (this.locationForm.valid) {
      const newLocation = await this.googleLocationService.getLocationByCoordinates(
        this.locationForm.get('latitude').value, this.locationForm.get('longitude').value);
      this.locationForm.get('location').setValue(newLocation);
    }
  }

  private createLocationForm(): any {
    const LATITUDE = '^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]*)?))$';
    const LONGITUDE = '^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]*)?))$';

    return this.formBuilder.group({
      location: [this.data.location],
      latitude: [this.data.latitude, [Validators.required, Validators.pattern(LATITUDE)]],
      longitude: [this.data.longitude, [Validators.required, Validators.pattern(LONGITUDE)]]
    });
  }
}

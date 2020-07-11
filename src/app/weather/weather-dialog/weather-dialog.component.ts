/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MapsAPILoader } from '@agm/core';
import { GoogleLocationService } from '../service/google-location.service';

@Component({
  selector: 'app-weather-dialog',
  templateUrl: './weather-dialog.component.html',
  styleUrls: ['./weather-dialog.component.scss']
})
export class WeatherDialogComponent implements OnInit {

  @ViewChild('search') public searchElement: ElementRef;

  locationForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<WeatherDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private googleLocationService: GoogleLocationService
  ) { }

  ngOnInit(): void {
    this.locationForm = this.createLocationForm();
    this.initPlaces();
    this.locationForm.get('location').setValue(this.data.location);
    this.locationForm.get('latitude').setValue(this.data.latitude);
    this.locationForm.get('longitude').setValue(this.data.longitude);
  }

  async onSubmit(): Promise<void> {
    await this.updateLocation();
    this.dialogRef.close(this.locationForm.value);
  }

  initPlaces(): any {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['geocode'] });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry !== undefined && place.geometry !== null) {
            const newLatitude = place.geometry.location.lat();
            this.locationForm.get('latitude').setValue(newLatitude);
            const newLongitude = place.geometry.location.lng();
            this.locationForm.get('longitude').setValue(newLongitude);
            const newLocation = this.searchElement.nativeElement.value;
            this.locationForm.get('location').setValue(newLocation);
          }
        });
      });
    });
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
      location: [''],
      latitude: ['', [Validators.required, Validators.pattern(LATITUDE)]],
      longitude: ['', [Validators.required, Validators.pattern(LONGITUDE)]]
    });
  }
}

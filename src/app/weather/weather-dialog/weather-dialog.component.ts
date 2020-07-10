/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MapsAPILoader } from '@agm/core';
import { GoogleLocationService } from '../service/google-location.service';

@Component({
  selector: 'app-weather-dialog',
  templateUrl: './weather-dialog.component.html',
  styleUrls: ['./weather-dialog.component.scss']
})
export class WeatherDialogComponent implements OnInit {

  @ViewChild('search') public searchElement: ElementRef;

  latitude: number;
  longitude: number;
  locationForm: FormGroup;

  constructor(public dialogRef: MatDialogRef<WeatherDialogComponent>, private formBuilder: FormBuilder,
              private mapsAPILoader: MapsAPILoader, private ngZone: NgZone, private googleLocationService: GoogleLocationService) { }

  ngOnInit(): void {
    this.locationForm = this.createLocationForm();
    this.initPlaces();
  }

  onSubmit(): void {
    this.dialogRef.close(this.locationForm.value);
  }

  initPlaces(): any {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['geocode'] });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();
          if (place.geometry !== undefined && place.geometry !== null) {
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
            this.locationForm.value.location = this.searchElement.nativeElement.value;
          }
        });
      });
    });
  }

  async test(): Promise<void> {
    if (this.locationForm.valid) {
      this.locationForm.value.location = await this.googleLocationService.getLocationByCoordinates(this.latitude, this.longitude);
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

/// <reference types="@types/googlemaps" />
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MapsAPILoader } from '@agm/core';
// import { } from '@types/googlemaps';

@Component({
  selector: 'app-weather-dialog',
  templateUrl: './weather-dialog.component.html',
  styleUrls: ['./weather-dialog.component.scss']
})
export class WeatherDialogComponent implements OnInit {

  locationForm: FormGroup;

  @ViewChild('search') public searchElement: ElementRef;

  constructor(public dialogRef: MatDialogRef<WeatherDialogComponent>, private formBuilder: FormBuilder,
              private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  ngOnInit(): void {
    const LATITUDE = '^(\\+|-)?(?:90(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\\.[0-9]{1,6})?))$';
    const LONGITUDE = '^(\\+|-)?(?:180(?:(?:\\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\\.[0-9]{1,6})?))$';

    this.locationForm = this.formBuilder.group({
      latitude: ['', [Validators.required, Validators.pattern(LATITUDE)]],
      longitude: ['', [Validators.required, Validators.pattern(LONGITUDE)]]
    });

    this.places();
  }

  onSubmit(): any {
    this.dialogRef.close(this.locationForm.value);
  }

  places(): any {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ['address'] });

      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          const place: google.maps.places.PlaceResult = autocomplete.getPlace();

          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
        });
      });
    });
  }

}

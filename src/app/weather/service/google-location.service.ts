/// <reference types="@types/googlemaps" />
import { Injectable, NgZone } from '@angular/core';

import { MapsAPILoader } from '@agm/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleLocationService {

  API_KEY = 'AIzaSyCROscb4Gmn7-5X6ERb9C5EiEjI-BY53wE';

  constructor(private http: HttpClient, private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) { }

  initPlaces(element: any): any {
    this.mapsAPILoader.load().then(() => {
      const autocomplete = new google.maps.places.Autocomplete(element, { types: ['address'] });

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

  async getLocationByCoordinates(lat: number, lng: number): Promise<string> {
    const data: any = await this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${this.API_KEY}`)
      .toPromise();
    return this.extractLocation(data);
  }

  private extractLocation(data): string {
    let extractedLocation;

    if (data.status === 'ZERO_RESULTS') {
      extractedLocation = 'Unknown location';
    }
    else if (data.plus_code.compound_code === undefined) {
      extractedLocation = data.results[0].formatted_address;
    }
    else {
      const compoundCode = data.plus_code.compound_code;
      extractedLocation = compoundCode.substr(compoundCode.indexOf(' ') + 1);
    }

    return extractedLocation;
  }
}

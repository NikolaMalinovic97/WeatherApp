/// <reference types="@types/googlemaps" />
import { Injectable,  } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GoogleLocationService {

  API_KEY = 'AIzaSyCROscb4Gmn7-5X6ERb9C5EiEjI-BY53wE';

  constructor(private http: HttpClient) { }

  async getAutocompleteOptions(input: string): Promise<any> {
    const proxyurl = 'https://cors-anywhere.herokuapp.com/';
    const data: any = await this.http.get(`${proxyurl}https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${input}&types=geocode&key=${this.API_KEY}`)
      .toPromise();
    return data;
  }

  async getCoordinatesByLocation(address: string): Promise<any> {
    const data: any = await this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${this.API_KEY}`)
      .toPromise();
    return data.results[0].geometry.location;
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

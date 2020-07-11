import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiUrl = 'https://api.met.no/weatherapi/locationforecast/1.9/';

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number): any {
    return this.http.get(`${this.apiUrl}.json?lat=${lat};lon=${lon}`);
  }

  saveLocation(location: string, title: string): void {
    localStorage.setItem(`${title}Location`, JSON.stringify(location));
  }

  getLocationByTitle(title: string): string {
    if (localStorage.getItem(`${title}Location`) == null) {
      return '';
    }
    const fullLocation = JSON.parse(localStorage.getItem(`${title}Location`));
    return fullLocation.location;
  }

  getLatitudeByTitle(title: string): number {
    if (localStorage.getItem(`${title}Location`) == null) {
      return 0;
    }
    const fullLocation = JSON.parse(localStorage.getItem(`${title}Location`));
    return fullLocation.latitude;
  }

  getLongitudeByTitle(title: string): number {
    if (localStorage.getItem(`${title}Location`) == null) {
      return 0;
    }
    const fullLocation = JSON.parse(localStorage.getItem(`${title}Location`));
    return fullLocation.longitude;
  }
}

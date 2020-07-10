import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from '../model/weather.model';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  apiUrl = 'https://api.met.no/weatherapi/locationforecast/1.9';

  constructor(private http: HttpClient) { }

  getWeather(lat: number, lon: number): any {
    return this.http.get(`${this.apiUrl}/?lat=${lat};lon=${lon}`, { responseType: 'text' });
  }

  saveLocation(location: string, title: string): void {
    localStorage.setItem(`${title}Location`, JSON.stringify(location));
  }

  getLocationByTitle(title: string): string {
    return JSON.parse(localStorage.getItem(`${title}Location`));
  }
}

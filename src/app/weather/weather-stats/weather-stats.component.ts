import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/weather/service/weather.service';
import { Weather } from '../model/weather.model';
import { MatDialog } from '@angular/material/dialog';
import { WeatherDialogComponent } from '../weather-dialog/weather-dialog.component';

@Component({
  selector: 'app-weather-stats',
  templateUrl: './weather-stats.component.html',
  styleUrls: ['./weather-stats.component.scss']
})
export class WeatherStatsComponent implements OnInit {

  @Input() buttonTitle: string;
  weather: Weather;
  location: string;
  latitude: number;
  longitude: number;

  constructor(private weatherService: WeatherService, private dialog: MatDialog) {
    this.weather = new Weather(0, 0, 0, 0, 0, 0, 0);
  }

  ngOnInit(): void {
    this.loadWeatherStatsFromStorage();
  }

  openDialog(): void {
    this.loadWeatherStatsFromStorage();
    const dialogRef = this.dialog.open(WeatherDialogComponent, {
      data: { location: this.location, latitude: this.latitude, longitude: this.longitude }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.location = result.location;
        this.weatherService.saveLocation(result, this.buttonTitle);
        this.updateWeather(result.latitude, result.longitude);
      }
    });
  }

  private loadWeatherStatsFromStorage(): void {
    this.location = this.weatherService.getLocationByTitle(this.buttonTitle);
    this.latitude = this.weatherService.getLatitudeByTitle(this.buttonTitle);
    this.longitude = this.weatherService.getLongitudeByTitle(this.buttonTitle);
    if (this.latitude !== 0 && this.longitude !== 0) {
      this.updateWeather(this.latitude, this.longitude);
    }
  }

  private updateWeather(lat: number, lon: number): void {
    this.weatherService.getWeather(lat, lon).subscribe(res => {
      const stats = res.product.time[0].location;
      this.weather.humidity = Math.round(stats.humidity.value);
      this.weather.dewPoint = Math.round(stats.dewpointTemperature.value);
      this.weather.temperature = Math.round(stats.temperature.value);
      this.weather.fog = Math.round(stats.fog.percent);
      this.weather.lowClouds = Math.round(stats.lowClouds.percent);
      this.weather.mediumClouds = Math.round(stats.mediumClouds.percent);
      this.weather.highClouds = Math.round(stats.highClouds.percent);
    });
  }
}

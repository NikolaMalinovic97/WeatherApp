import { Component, OnInit, Input } from '@angular/core';
import { WeatherService } from 'src/app/weather/service/weather.service';
import { Weather } from '../model/weather.model';
import xml2js from 'xml2js';
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

  constructor(private weatherService: WeatherService, private dialog: MatDialog) {
    this.weather = new Weather(0, 0, 0, 0, 0, 0, 0);
  }

  ngOnInit(): void {
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(WeatherDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        this.updateWeather(result.latitude, result.longitude);
      }
    });
  }

  updateWeather(lat: number, lon: number): void {
    this.weatherService.getWeather(lat, lon).subscribe(res => {
      xml2js.parseString(res, (err, result) => {
        const stats = result.weatherdata.product[0].time[0].location[0];
        this.weather.humidity = Math.round(stats.humidity[0].$.value);
        this.weather.dewPoint = Math.round(stats.dewpointTemperature[0].$.value);
        this.weather.temperature = Math.round(stats.temperature[0].$.value);
        this.weather.fog = Math.round(stats.fog[0].$.percent);
        this.weather.lowClouds = Math.round(stats.lowClouds[0].$.percent);
        this.weather.mediumClouds = Math.round(stats.mediumClouds[0].$.percent);
        this.weather.highClouds = Math.round(stats.highClouds[0].$.percent);
      });
    });
  }
}

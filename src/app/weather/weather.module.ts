import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStatsComponent } from './weather-stats/weather-stats.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';


@NgModule({
  declarations: [WeatherStatsComponent],
  exports: [
    WeatherStatsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule
  ]
})
export class WeatherModule { }

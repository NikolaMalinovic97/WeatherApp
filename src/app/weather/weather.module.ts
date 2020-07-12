import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherStatsComponent } from './weather-stats/weather-stats.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { WeatherDialogComponent } from './weather-dialog/weather-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { WeatherBackgroundDirective } from './directive/weather-background.directive';


@NgModule({
  declarations: [WeatherStatsComponent, WeatherDialogComponent, WeatherBackgroundDirective],
  exports: [
    WeatherStatsComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class WeatherModule { }

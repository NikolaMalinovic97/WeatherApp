import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherStatsComponent } from './weather-stats.component';

describe('WeatherStatsComponent', () => {
  let component: WeatherStatsComponent;
  let fixture: ComponentFixture<WeatherStatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherStatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

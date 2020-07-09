import { Directive, Input, ElementRef, HostListener, OnChanges } from '@angular/core';

@Directive({
  selector: '[appWeatherBackground]'
})
export class WeatherBackgroundDirective implements OnChanges {

  @Input() weatherType: string;
  @Input() weatherValue: number;

  constructor(private element: ElementRef) {
    element.nativeElement.style.height = '100%';
    element.nativeElement.style.width = '100%';
    element.nativeElement.style.backgroundRepeat = 'no-repeat';
    element.nativeElement.style.backgroundSize = 'contain';
  }

  @HostListener('change') ngOnChanges(): void {
    this.element.nativeElement.style.backgroundImage = this.getBackgroundImage();
    this.element.nativeElement.style.backgroundPosition = this.getBackgroundPosition();
    this.element.nativeElement.style.opacity = this.weatherType === 'fog' ? this.getFogOpacity() : this.getCloudOpacity();
  }

  getBackgroundImage(): string {
    if (this.weatherType === 'fog' && this.weatherValue < 20) {
      return 'url("../../../assets/img/sun.png")';
    }
    else if (this.weatherType === 'fog' && this.weatherValue >= 20) {
      return 'url("../../../assets/img/fog.png")';
    }
    else {
      return 'url("../../../assets/img/cloud.png")';
    }
  }

  getBackgroundPosition(): string {
    if (this.weatherType === 'lowClouds') {
      return '10% 90%';
    }
    else if (this.weatherType === 'highClouds') {
      return '10% 50%';
    }
    else {
      return '10% 70%';
    }
  }

  getCloudOpacity(): number {
    if (this.weatherValue < 20) {
      return 0;
    }
    else if (this.weatherValue < 50) {
      return 0.5;
    }
    return 1;
  }

  getFogOpacity(): number {
    if (this.weatherValue >= 20 && this.weatherValue <= 50) {
      return 0.5;
    }
    return 1;
  }

}

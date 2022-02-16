import { Component, ComponentFactoryResolver, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { PackageModel } from 'src/app/models/package.model';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-calendar-weather',
  templateUrl: './calendar-weather.component.html',
  styleUrls: ['./calendar-weather.component.scss']
})
export class CalendarWeatherComponent implements OnInit {

  @Input() public packageDetails?: PackageModel;

  days: Array<any> = [];


  constructor(private weatherService: WeatherService, private locationService: LocationService) { }

  ngOnInit(): void {
    this.packageDetails 
      ? this.locationService.getCoordsByCityName(this.packageDetails.city).pipe(
          switchMap((coords: any) => this.weatherService.getWeatherForecast(coords.results[0].geometry.location.lng, coords.results[0].geometry.location.lat))
        ).subscribe((data: any) => {
          console.log(data);
          this.days = data.daily;
        })
      : 0;
    }

  public getDate(date: any) {
    return new Date(date * 1000);
  }

  public getDate1(date: number) {
    const newDate = new Date(date * 1000);
    console.log(newDate.getDay());
  }

}

import { Component, Input, OnInit } from '@angular/core';
import { switchMap } from 'rxjs';
import { PackageModel } from 'src/app/models/package.model';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-calendar-weather',
  templateUrl: './calendar-weather.component.html',
  styleUrls: ['./calendar-weather.component.scss']
})
export class CalendarWeatherComponent implements OnInit {

  @Input() public packageDetails?: PackageModel;

  days: Array<any> = [];


  constructor(private weatherService: WeatherService) { }

  ngOnInit(): void {
    this.packageDetails 
      ? this.weatherService.getChoosenCityCoords(this.packageDetails.city).pipe(
          switchMap((coords: any) => this.weatherService.getWeatherForecast(coords[0].lon, coords[0].lat))
        ).subscribe((data: any) => {
          this.days = data.daily;
        })
      : 0;
    console.log(this.packageDetails);
  }

  public getDate(date: any) {
    return new Date(date * 1000);
  }

}

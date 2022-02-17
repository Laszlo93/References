import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { first, last, switchMap } from 'rxjs';
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
  @Output() clickEvent = new EventEmitter();

  days: Array<any> = [];
  public selectedDateBgColor: string = "none";
  public selectedIndex?: number;
  public arriveDate?: any;
  public leaveDate?: any;




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

  public getDate1(date: number, index: number) {
    this.selectedIndex = index;
    if (this.packageDetails) {
      this.arriveDate = new Date(date * 1000);
      this.leaveDate = new Date(this.arriveDate);
      this.leaveDate.setDate(this.arriveDate.getDate() + this.packageDetails?.days);
    }
    this.clickEvent.emit({arrive: this.arriveDate, leave: this.leaveDate});
  }

  public setClass(i: number) {
    if(this.selectedIndex != undefined) {
      return i >= this.selectedIndex && i <= this.selectedIndex + 2 ? "selected-date" : "non-selected-date";
    }
    return "non-selected-date";
  }
}

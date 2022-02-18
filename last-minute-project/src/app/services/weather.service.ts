import { HttpClient, HttpParams} from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) { }

  // public getChoosenCityCoords(city: string) {
  //   const coordsRequest = new HttpParams()
  //     .set('q', city)
  //     .set("appid", "fddbfd7f5104cc1f882b6c27c29bc980");
    
  //   return this.http.get("http://api.openweathermap.org/geo/1.0/direct", { params: coordsRequest });
  // }

  public getWeatherForecast(lon: number, lat: number) {
    const weatherRequest = new HttpParams()
      .set("lon", lon)
      .set("lat", lat)
      .set("exclude", "minutely,hourly,alerts")
      .set("units", "metric")
      .set("appid", "fddbfd7f5104cc1f882b6c27c29bc980");

    return this.http.get("https://api.openweathermap.org/data/2.5/onecall", { params: weatherRequest });
  }
}

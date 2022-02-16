import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(private http: HttpClient) { }

  public getCityNameByCoords(lat: number, lng: number) {
    const coordsRequest = new HttpParams()
      .set('latlng', `${lat}, ${lng}`)
      .set("key", "AIzaSyCZqSH-NYl8sCpuHXbXwbCFASm7luN30q4")
      .set("location_type", "ROOFTOP");
    
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json", { params: coordsRequest });
  }

  public getCoordsByCityName(city: string) {
    const coordsRequest = new HttpParams()
      .set('address', city)
      .set("key", "AIzaSyCZqSH-NYl8sCpuHXbXwbCFASm7luN30q4")
      .set("location_type", "ROOFTOP");
    
    return this.http.get("https://maps.googleapis.com/maps/api/geocode/json", { params: coordsRequest });
  }

  public getCurrentPosition() {
    return of(navigator.geolocation.getCurrentPosition);
  }
}

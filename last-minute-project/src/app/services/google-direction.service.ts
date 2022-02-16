import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GoogleDirectionService {
  lat: number = 47.497913;
  lng: number = 19.040236;

  constructor() { }

  public getGeolocation() {
    navigator.geolocation.getCurrentPosition(
      data => {
        // console.log(data);
        this.lat = data.coords.latitude;
        this.lng = data.coords.longitude;
      }, 
      e => console.log(e)
    );
    return {latitude: this.lat, longitude: this.lng}
  }
}

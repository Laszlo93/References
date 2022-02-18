import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GoogleDirectionService {

  directionsService = new google.maps.DirectionsService();

  constructor(private http: HttpClient) { }

  service = new google.maps.DistanceMatrixService();

  public getRoute(origin: string, destination: string): Observable<google.maps.DirectionsResult> {
    return from(this.directionsService
            .route(
              {
                origin: origin,
                destination: destination,
                travelMode: google.maps.TravelMode.TRANSIT,
                transitOptions: {
                  modes: [google.maps.TransitMode.BUS],
                  routingPreference: google.maps.TransitRoutePreference.FEWER_TRANSFERS
                }
              }
            ));
  }
}

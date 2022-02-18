import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleMapsModule, MapGeocoder, MapMarker, MapMarkerClusterer } from '@angular/google-maps';
import { GoogleDirectionService } from 'src/app/services/google-direction.service';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-travel-planner',
  templateUrl: './travel-planner.component.html',
  styleUrls: ['./travel-planner.component.scss']
})
export class TravelPlannerComponent implements OnInit {
  
  @Input() destination?: string;

  @ViewChild('map') mapElement?: ElementRef;
  @ViewChild('clickedButton') clickedButton?: ElementRef;

  public mapReference: HTMLElement = this.mapElement?.nativeElement;
  public map: any;
  public marker?: GoogleMapsModule;
  public directionsService = new google.maps.DirectionsService();
  public directionsRenderer = new google.maps.DirectionsRenderer();

  public defaultLat: number = 47.497913;
  public defaultLng: number = 19.040236;

  public distance?: number;
  public duration?: string;
  public cost?: number;

  public origin: string = '';
  public splittedOrigin: Array<string> = [];

  public isClicked: boolean = false;

  constructor(private locationService: LocationService, private googleService: GoogleDirectionService) { 
  }

  ngOnInit(): void{
    this.getCurrentPosition();
  }

  public getCurrentPosition() {
    console.log("valami");
    navigator.geolocation.getCurrentPosition(
      data => {
        this.defaultLat = data.coords.latitude;
        this.defaultLng = data.coords.longitude;
        this.initializeMap();
        this.locationService.getCityNameByCoords(this.defaultLat, this.defaultLng).subscribe((data: any) => this.origin = data.results[0].formatted_address);
      }, 
      e => {
        console.error(e)
        this.initializeMap();
      }
      );
  }

  public initializeMap() {  
    const mapReference: HTMLElement = this.mapElement?.nativeElement;
    this.map = new google.maps.Map(mapReference, {
      zoom: 12,
      center: { lat: this.defaultLat, lng: this.defaultLng },
    });

    this.marker = new google.maps.Marker({
      position: {
        lat: this.defaultLat,
        lng: this.defaultLng
      },
      map: this.map
    })    
  }

  public initMap(): void {
    this.isClicked = true;

    this.directionsRenderer.setMap(this.map);

    this.destination 
      ? this.googleService.getRoute(this.origin, this.destination).subscribe((data: google.maps.DirectionsResult) => {
          console.log(data);
          this.directionsRenderer.setDirections(data);
          this.calculateCostAndDistance(data);
        })
      : 0;
  }

  public calculateCostAndDistance(directionResult: google.maps.DirectionsResult): void {
    const distanceInMeters: number | undefined = directionResult.routes[0].legs[0].distance?.value;
    const durationInSec: number | undefined = directionResult.routes[0].legs[0].duration?.value;
    let durationWithFractionalNumber: number = 0;

    durationInSec ? durationWithFractionalNumber = (durationInSec / 60 / 60) : 0;
    distanceInMeters ? this.distance = Math.floor((distanceInMeters / 1000)) : 0;
    if (distanceInMeters) {
      this.distance = Math.floor((distanceInMeters / 1000));
      this.cost = Math.floor(this.distance / 100 * 7 * 480 * 2);
    }
    this.duration = `${Math.floor(durationWithFractionalNumber)} óra ${(durationWithFractionalNumber % 1 * 60).toFixed(0)} perc`;
    this.splittedOrigin = this.origin.split(',');
  }
}

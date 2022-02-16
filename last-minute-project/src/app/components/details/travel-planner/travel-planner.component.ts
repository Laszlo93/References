import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MapGeocoder } from '@angular/google-maps';
import { GoogleDirectionService } from 'src/app/services/google-direction.service';
import { LocationService } from 'src/app/services/location.service';
import { WeatherService } from 'src/app/services/weather.service';

@Component({
  selector: 'app-travel-planner',
  templateUrl: './travel-planner.component.html',
  styleUrls: ['./travel-planner.component.scss']
})
export class TravelPlannerComponent implements OnInit {

  @ViewChild('map') mapElement?: ElementRef;
  @ViewChild('clickedButton') clickedButton?: ElementRef;
  @Input() destination?: string;
  public mapReference: HTMLElement = this.mapElement?.nativeElement;
  public map: any;
  public marker: any;
  latLngCoords: any = {};
  lat: number = 47.497913;
  lng: number = 19.040236;
  origin: string = '';


  constructor(private locationService: LocationService) { 

    //this.initMap();
  }

  ngOnInit(): void{
    this.getCurrentPosition();
    // this.latLngCoords = this.geolocationService.getGeolocation();
  }

  public getCurrentPosition() {
    console.log("valami");
    navigator.geolocation.getCurrentPosition(
      data => {
        this.lat = data.coords.latitude;
        this.lng = data.coords.longitude;
        this.initializeMap();
        this.locationService.getCityNameByCoords(this.lat, this.lng).subscribe((data: any) => this.origin = data.results[0].formatted_address);
      }, 
      e => {
        console.error(e)
        this.initializeMap();
      }
      );
  }

  public initializeMap() {  
    const mapReference: HTMLElement = this.mapElement?.nativeElement;
    const latLng = new google.maps.LatLngBounds();
    this.map = new google.maps.Map(mapReference, {
      zoom: 12,
      center: { lat: this.lat, lng: this.lng },
    });

    this.marker = new google.maps.Marker({
      position: {
        lat: this.lat,
        lng: this.lng
      },
      map: this.map
    })

    console.log(this.latLngCoords.latitude);
    console.log(this.latLngCoords.longitude);
    
  }

  initMap() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
      
    directionsRenderer.setMap(this.map);

    this.calculateAndDisplayRoute(directionsService, directionsRenderer);
  }
  
  calculateAndDisplayRoute(directionsService: any, directionsRenderer: any) {
       directionsService
      .route({
        origin: this.origin,
        destination: this.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response: any) => {
        console.log(response.getDestination);
        directionsRenderer.setDirections(response);
      })
      .catch((e: any) => window.alert("Directions request failed due to " + status));
  }


  public async getLat() {
    // let lat = 0;
    // let lng = 0;
    // const valami = navigator.geolocation.getCurrentPosition(
    //       data => {
    //         // console.log(data);
    //         lat = data.coords.latitude;
    //         lng = data.coords.longitude;
    //       }, 
    //       e => console.log(e)
    //       );
    // console.log("Valami: " + valami);
  }
  // public getLng(): number {
  //   let lat = 0;
  //   let lng = 0;
  //   navigator.geolocation.getCurrentPosition(
  //         data => {
  //           console.log(data);
  //           lat = data.coords.latitude;
  //           lng = data.coords.longitude;
  //         }, 
  //         e => console.log(e)
  //         );
  //   return lng;
  // }



}

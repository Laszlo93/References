import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { GoogleDirectionService } from 'src/app/services/google-direction.service';

@Component({
  selector: 'app-travel-planner',
  templateUrl: './travel-planner.component.html',
  styleUrls: ['./travel-planner.component.scss']
})
export class TravelPlannerComponent implements OnInit, OnChanges {

  @ViewChild('map') mapElement?: ElementRef;
  @ViewChild('clickedButton') clickedButton?: ElementRef;
  @Input() destination?: string;
  public mapReference: HTMLElement = this.mapElement?.nativeElement;
  public map: any;
  public marker: any;
  latLngCoords: any = {};
  lat: number = 47.497913;
  lng: number = 19.040236;

  valami = google.maps.ControlPosition;


  constructor() { 

    //this.initMap();
  }

  ngOnInit(): void{
    this.getCurrentPosition();
    // this.latLngCoords = this.geolocationService.getGeolocation();
  }

  ngOnChanges(): void {
    this.getCurrentPosition();
  }

  public getCurrentPosition() {
    console.log("valami");
    window.navigator.geolocation.getCurrentPosition(
      data => {
        this.lat = data.coords.latitude;
        this.lng = data.coords.longitude;
        this.initializeMap();
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
    console.log("valami");
    console.log(this.mapReference);
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer();
    

    console.log(document.getElementById("map"));
  
    directionsRenderer.setMap(this.map);

    this.calculateAndDisplayRoute(directionsService, directionsRenderer);

  }
  
  calculateAndDisplayRoute(directionsService: any, directionsRenderer: any) {
       directionsService
      .route({
        origin: "Békéscsaba",
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

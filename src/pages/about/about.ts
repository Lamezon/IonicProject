import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import {  
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  Circle
} from '@ionic-native/google-maps';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  resp_coords: any;
  latitude: any;
  longitude: any;
  map: GoogleMap;
  elevation: any;
  accuracy: any;
  speed: any;
  constructor(public navCtrl: NavController, private geolocation: Geolocation) {

  }
  loadMap() {
    let api_key = 'AIzaSyB5kxJ96SiNeyfJFtxzomK16EOEqFjqtVY'
Environment.setEnv({
  'API_KEY_FOR_BROWSER_RELEASE': api_key,
  'API_KEY_FOR_BROWSER_DEBUG': api_key
});
let mapOptions: GoogleMapOptions = {
  camera: {
    target: {
      lat: this.latitude,
      lng: this.longitude
    },
    zoom: 18,
    tilt: 30,
    
    
  }
  
}


var circle = new google.maps.Circle({
  map: map,
  radius: 50,    // 10 miles in metres
  fillColor: '#AA0000'
});
circle.bindTo('center', marker, 'position');
this.map = GoogleMaps.create('map', mapOptions);
let marker: Marker = this.map.addMarkerSync({
  	title: 'Myself',
  	icon: 'green',
    animation: 'DROP',
    strokeColor: '#FF0000',
    strokeOpacity: 0.8,
    strokeWeight: 2,
    fillColor: '#FF0000',
    fillOpacity: 0.35,

  	position: {
    	lat: this.latitude,
      lng: this.longitude,
      
    }
    
});
marker.showInfoWindow();
  }

  ionViewDidLoad() {
    
    this.geolocation.getCurrentPosition()
    .then((resp) => {
      this.resp_coords = resp.coords;
      this.latitude = this.resp_coords.latitude;
      this.longitude = this.resp_coords.longitude;
      this.loadMap();
      this.elevation = this.resp_coords.elevation;
      this.accuracy = this.resp_coords.accuracy;
      this.speed = this.resp_coords.speed;
 

     
  

      console.log(resp);
    }).catch((error) => {
      console.log('Erro ao recuperar sua posição')
      console.log(error);
    });
    let watch = this.geolocation.watchPosition();
    watch
      .subscribe((resp) => {
        this.resp_coords = resp.coords;
        this.latitude = this.resp_coords.latitude;
        this.longitude = this.resp_coords.longitude;
        this.loadMap();
        this.elevation = this.resp_coords.elevation;
        this.accuracy = this.resp_coords.accuracy;
        this.speed = this.resp_coords.speed;
      },(error) => {
        console.log(error);
      });
    
  }
  

}

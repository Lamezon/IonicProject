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
  Environment
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
    let api_key = 'AIzaSyB5kxJ96SiNeyfJFtxzomK16EOEqFjqtVY';
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
this.map = GoogleMaps.create('map', mapOptions);



let review: Marker = this.map.addMarkerSync({
  title: 'Review',
  icon: 'red',
  animation: 'DROP',
  position: {
    lat: this.latitude+10,
    lng: this.longitude+10,
  }
});


let marker: Marker = this.map.addMarkerSync({
  	title: 'Eu',
    icon: 'blue',
  	animation: 'DROP',
  	position: {
    	lat: this.latitude,
    	lng: this.longitude
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

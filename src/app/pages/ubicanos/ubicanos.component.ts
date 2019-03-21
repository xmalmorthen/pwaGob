import { Component, Input, ViewChild, NgZone, OnInit } from "@angular/core";
import { MapsAPILoader, AgmMap } from "@agm/core";
import { GoogleMapsAPIWrapper } from "@agm/core/services";

declare var google: any;

interface MarkerInfo {
  img?: string;
  info?: string;
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  isOpen? : boolean;
  info: MarkerInfo;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: Object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  markers?: Marker[];
}

@Component({
  selector: "app-ubicanos",
  templateUrl: "./ubicanos.component.html",
  styleUrls: ["./ubicanos.component.css"]
})
export class UbicanosComponent implements OnInit {
  geocoder: any;
  //@ViewChild(AgmMap) map: AgmMap;
  
  public location: Location = {
    lat: 19.2433,
    lng: -103.725,
    markers: [],
    zoom: 10
  };

  constructor(
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper
  ) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {
      this.location.markers = [
        {
          lat: 19.2433,
          lng: -103.725,
          label: "Colima",
          draggable: true,
          info: {
            info: "Información Kiosco Colima"
          }
        },
        {
          lat: 19.39444,
          lng: -103.73056,
          label: "Comala",
          draggable: false,
          info: {
            info: "Información Kiosco Comala"
          }
        },
        {
          lat: 19.05922,
          lng: -104.30156,
          label: "Manzanillo",
          draggable: true,
          info: {
            info: "Información Kiosco Manzanillo"
          }
        }
      ];

      this.geocoder = new google.maps.Geocoder();
    });
  }

  ngOnInit() {}

  close_window() : void {
    this.location.markers.forEach(marker => {
      marker.isOpen = false;
    });
  }

  select_marker(marker) : void {
    this.close_window();
    marker.isOpen = true;    
  }

  public btnClick(event: Event) : void{
    this.select_marker(this.location.markers[2]);
    this.location.lat = this.location.markers[2].lat;
    this.location.lng = this.location.markers[2].lng;
  }
}

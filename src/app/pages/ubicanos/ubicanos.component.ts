import { Component, Input, ViewChild, NgZone, OnInit, AfterViewInit } from '@angular/core';
import { MapsAPILoader, AgmMap } from '@agm/core';
import { GoogleMapsAPIWrapper } from '@agm/core/services';
import Swal from 'sweetalert2';

//ENUMERATORS
import { TRAVELMODE } from 'src/app/enumerators/TRAVELMODE';

//SERVICES
import { GeoLicationService, WsKioscosService } from 'src/app/services/service.index';

//INTERFACES
import { KioscoInterface } from 'src/app/interfaces/kioscos.interface';
import { RootObjectInterface } from 'src/app/interfaces/GeocoderResponse.interface';
import { RouteKioscosInterface, LocationInterface, MarkerInterface } from 'src/app/interfaces/map.interface';

declare const $: any;
declare const M: any;
declare var google: any;

@Component({
  selector: 'app-ubicanos',
  templateUrl: './ubicanos.component.html',
  styleUrls: ['./ubicanos.component.css']
})
export class UbicanosComponent implements OnInit {
  geocoder: any;
  @ViewChild(AgmMap) map: AgmMap;

  public location: LocationInterface = {};

  public selectedmarker: MarkerInterface = null;
  public dropdownKioscosAnchor = null;

  public route: RouteKioscosInterface = null;

  constructor(
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper,
    private wsKioscosService: WsKioscosService,
    private geoLocation: GeoLicationService
  ) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;

    this.location = {
      geoUbication : false,
      markers : [],
      zoom: 10
    };

    this.geoLocation.getCurrentPosition()
      .then( (pos: any) => {
        this.location.mapLat = pos.coords.latitude;
        this.location.mapLng = pos.coords.longitude;
        this.location.posLat = pos.coords.latitude;
        this.location.posLng = pos.coords.longitude;
        this.location.geoUbication = true;

        M.toast({html: 'Geolocalización realizada'});
      })
      .catch ( (err) => {
        this.location.mapLat = 19.2433;
        this.location.mapLng = -103.725;
        this.location.geoUbication = false;

        M.toast({html: `Sin geolocalización [ ${err} ]`});
      });

    Promise.race([
      this.wsKioscosService.getKioscosFromWs(),
      this.wsKioscosService.getKioscosFromJson()
    ])
      .then((kioscos: KioscoInterface[]) => {
        this.mapsApiLoader.load().then(() => {
          kioscos.forEach((kiosco: KioscoInterface) => {
            this.location.markers.push(
              {
                lat: Number(kiosco.coordenadax),
                lng: Number(kiosco.coordenaday),
                label: '',
                draggable: false,
                info: {
                  nombre: kiosco.nombre,
                  localidad: kiosco.localidad,
                  horario: kiosco.horario,
                  direccion: kiosco.direccion,
                  id: kiosco.id_kiosco
                }
            });
          });

          this.geocoder = new google.maps.Geocoder();
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.dropdownKioscosAnchor = M.Dropdown.init(document.querySelectorAll('.dropdownKioscosAnchor'), { constrainWidth : false });
  }

  close_window(): void {
    this.location.markers.forEach(marker => {
      marker.isOpen = false;
    });
    this.selectedmarker = null;
    this.route = null;
  }

  select_marker(marker: MarkerInterface): void {
    this.close_window();
    marker.isOpen = true;
    this.selectedmarker = marker;

    const currentTravelMode = this.route ? this.route.travelMode : TRAVELMODE.DRIVING;

    this.route = {
      origin: {
        lat: this.location.posLat,
        lng: this.location.posLng
      },
      destination: {
        lat: this.selectedmarker.lat,
        lng: this.selectedmarker.lng
      },
      travelMode : currentTravelMode
    };

    // document.querySelector('#infoSection').scrollIntoView();
  }

  public tableItemSelect(event: Event, id: number): void {
    event.stopPropagation();

    this.select_marker(this.location.markers[id]);
    this.location.mapLat = this.location.markers[id].lat;
    this.location.mapLng = this.location.markers[id].lng;
  }

  public changeTravelMode(mode: number): void {
    switch (mode) {
      case 0:
        this.route.travelMode = TRAVELMODE.BICYCLING;
        break;
      case 1:
        this.route.travelMode = TRAVELMODE.DRIVING;
        break;
      case 2:
        this.route.travelMode = TRAVELMODE.WALKING;
        break;
    }
  }

  public onResponseRoute(event: RootObjectInterface): void {
    this.route.response = event;

    if (this.route.response.status === 'OK') {
      this.selectedmarker.info.distance = this.route.response.routes[0].legs[0].distance.text;
      this.selectedmarker.info.time = this.route.response.routes[0].legs[0].duration.text;
    }

    //console.log(this.route.response);
  }

}

import { Component, Input, ViewChild, NgZone, OnInit } from "@angular/core";
import { MapsAPILoader, AgmMap } from "@agm/core";
import { GoogleMapsAPIWrapper } from "@agm/core/services";
import { WsKioscosService } from "src/app/services/ws-kioscos.service";
import Swal from "sweetalert2";

// INTERFACES
import { KioscoInterface } from "src/app/interfaces/kioscos.interface";
import { Location, Marker, MarkerInfo } from "src/app/interfaces/map.interface";

// SERVICES
import { GeoLicationService } from 'src/app/services/geo-lication.service';

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

  public location: Location = {};

  public selectedmarker: Marker = null;
  public dropdownKioscosAnchor = null;

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
      markers : [],
      zoom: 10
    };

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
    document.addEventListener('DOMContentLoaded', () => {
      this.dropdownKioscosAnchor = M.Dropdown.init(document.querySelectorAll('.dropdownKioscosAnchor'), { constrainWidth : false });
    });

    this.geoLocation.getCurrentPosition()
      .then( (pos: any) => {
        this.location.mapLat = pos.coords.latitude;
        this.location.mapLng = pos.coords.longitude;
        this.location.posLat = pos.coords.latitude;
        this.location.posLng = pos.coords.longitude;

        M.toast({html: 'Geolocalización realizada'});
      })
      .catch ( (err) => {
        this.location.mapLat = 19.2433;
        this.location.mapLng = -103.725;
        M.toast({html: `Sin geolocalización [ ${err} ]`});
      });
  }

  close_window(): void {
    this.location.markers.forEach(marker => {
      marker.isOpen = false;
    });
    this.selectedmarker = null;
  }

  select_marker(marker): void {
    this.close_window();
    marker.isOpen = true;
    this.selectedmarker = marker;

    // document.querySelector('#infoSection').scrollIntoView();
  }

  public tableItemSelect(event: Event, id: number): void {
    event.stopPropagation();

    this.select_marker(this.location.markers[id]);
    this.location.mapLat = this.location.markers[id].lat;
    this.location.mapLng = this.location.markers[id].lng;
  }
}

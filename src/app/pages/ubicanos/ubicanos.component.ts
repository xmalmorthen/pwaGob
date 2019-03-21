import { Component, Input, ViewChild, NgZone, OnInit, AfterViewInit, QueryList, ViewChildren } from "@angular/core";
import { MapsAPILoader, AgmMap } from "@agm/core";
import { GoogleMapsAPIWrapper } from "@agm/core/services";
import { WsKioscosService } from "src/app/services/ws-kioscos.service";
import Swal from "sweetalert2";
import { KioscoInterface } from "src/app/interfaces/kioscos.interface";

declare var $: any;
declare var google: any;

interface MarkerInfo {
  img?: string;
  nombre?: string;
  localidad?: string;
  horario?: string;
  direccion?: string;
  id?: number;
}

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  isOpen?: boolean;
  info: MarkerInfo;
}

interface Location {
  lat: number;
  lng: number;
  viewport?: object;
  zoom: number;
  address_level_1?: string;
  address_level_2?: string;
  address_country?: string;
  address_zip?: string;
  address_state?: string;
  markers?: Marker[];
}

@Component({
  selector: 'app-ubicanos',
  templateUrl: './ubicanos.component.html',
  styleUrls: ['./ubicanos.component.css']
})
export class UbicanosComponent implements AfterViewInit  {
  geocoder: any;
  @ViewChild(AgmMap) map: AgmMap;
  @ViewChildren('kioscoRow') kioscoRow: QueryList<Marker>;

  public location: Location = {
    lat: 19.2433,
    lng: -103.725,
    markers: [],
    zoom: 10
  };

  public selectedmarker: Marker = null;

  constructor(
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper,
    private wsKioscosService: WsKioscosService
  ) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;

    Promise.race([
      this.wsKioscosService.getKioscosFromWs(),
      this.wsKioscosService.getKioscosFromJson()
    ])
      .then((kioscos: KioscoInterface[]) => {
        console.log(kioscos);

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

  ngAfterViewInit() {
    this.kioscoRow.changes.subscribe(t => {
      debugger;
      $('#kioscosTable').pageMe({
        pagerSelector: '#myPager',
        activeColor: 'blue',
        prevText: 'Anterior',
        nextText: 'Siguiente',
        showPrevNext: true,
        hidePageNumbers: false,
        perPage: 10
      });
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

    document.querySelector('#infoSection').scrollIntoView();
  }

  public tableItemSelect(event: Event, id: number): void {
    this.select_marker(this.location.markers[id]);
    this.location.lat = this.location.markers[id].lat;
    this.location.lng = this.location.markers[id].lng;
  }
}

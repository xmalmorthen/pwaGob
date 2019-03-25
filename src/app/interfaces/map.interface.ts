import { RootObjectInterface } from './GeocoderResponse.interface';
import { TRAVELMODE } from '../enumerators/TRAVELMODE';

export interface MarkerInfoInterface {
  img?: string;
  nombre?: string;
  localidad?: string;
  horario?: string;
  direccion?: string;
  id?: number;
  distance?: string;
  time?: string;
}

export interface MarkerInterface {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
  isOpen?: boolean;
  info: MarkerInfoInterface;
}

export interface LocationInterface {
  mapLat?: number;
  mapLng?: number;
  geoUbication?: boolean;
  posLat?: number;
  posLng?: number;
  viewport?: object;
  zoom?: number;
  markers?: MarkerInterface[];
}

export interface RoutePointInterface {
  lat: number;
  lng: number;
}

export interface RouteKioscosInterface {
  origin: RoutePointInterface;
  destination: RoutePointInterface;
  travelMode: TRAVELMODE;
  response?: RootObjectInterface;
}
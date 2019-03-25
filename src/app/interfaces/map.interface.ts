export interface MarkerInfo {
    img?: string;
    nombre?: string;
    localidad?: string;
    horario?: string;
    direccion?: string;
    id?: number;
  }
  
export interface Marker {
    lat: number;
    lng: number;
    label?: string;
    draggable: boolean;
    isOpen?: boolean;
    info: MarkerInfo;
  }
  
  export interface Location {
    mapLat?: number;
    mapLng?: number;
    posLat?: number;
    posLng?: number;
    viewport?: object;
    zoom?: number;
    markers?: Marker[];
  }
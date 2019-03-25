export interface RootObjectInterface {
  status: string;
  geocoded_waypoints: GeocodedwaypointInterface[];
  routes: RouteInterface[];
}

export interface RouteInterface {
  summary: string;
  legs: LegInterface[];
  copyrights: string;
  overview_polyline: PolylineInterface;
  warnings: any[];
  waypoint_order: number[];
  bounds: BoundsInterface;
}

export interface BoundsInterface {
  southwest: StartlocationInterface;
  northeast: StartlocationInterface;
}

export interface LegInterface {
  steps: StepInterface[];
  duration: DurationInterface;
  distance: DurationInterface;
  start_location: StartlocationInterface;
  end_location: StartlocationInterface;
  start_address: string;
  end_address: string;
}

export interface StepInterface {
  travel_mode: string;
  start_location: StartlocationInterface;
  end_location: StartlocationInterface;
  polyline: PolylineInterface;
  duration: DurationInterface;
  html_instructions: string;
  distance: DurationInterface;
}

export interface DurationInterface {
  value: number;
  text: string;
}

export interface PolylineInterface {
  points: string;
}

export interface StartlocationInterface {
  lat: number;
  lng: number;
}

export interface GeocodedwaypointInterface {
  geocoder_status: string;
  place_id: string;
  types: string[];
}

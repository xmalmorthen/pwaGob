export interface RootObject {
  status: string;
  geocoded_waypoints: Geocodedwaypoint[];
  routes: Route[];
}

export interface Route {
  summary: string;
  legs: Leg[];
  copyrights: string;
  overview_polyline: Polyline;
  warnings: any[];
  waypoint_order: number[];
  bounds: Bounds;
}

export interface Bounds {
  southwest: Startlocation;
  northeast: Startlocation;
}

export interface Leg {
  steps: Step[];
  duration: Duration;
  distance: Duration;
  start_location: Startlocation;
  end_location: Startlocation;
  start_address: string;
  end_address: string;
}

export interface Step {
  travel_mode: string;
  start_location: Startlocation;
  end_location: Startlocation;
  polyline: Polyline;
  duration: Duration;
  html_instructions: string;
  distance: Duration;
}

export interface Duration {
  value: number;
  text: string;
}

export interface Polyline {
  points: string;
}

export interface Startlocation {
  lat: number;
  lng: number;
}

export interface Geocodedwaypoint {
  geocoder_status: string;
  place_id: string;
  types: string[];
}

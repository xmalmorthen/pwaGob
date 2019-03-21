export interface KioscosRESTService {
  RESTService: RESTService;
  response: KioscoInterface[];
}

export interface RESTService {
  status_response: string;
  message: string;
  fecha: string;
  hora: string;
  response_key: string;
  response_time: string;
}

export interface KioscoInterface {
  id_kiosco: number;
  nombre: string;
  direccion: string;
  horario: string;
  localidad: string;
  coordenadax: string;
  coordenaday: string;
}
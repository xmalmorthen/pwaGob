export interface WSBuscarTramiteInterface {
  resultado: ResultadoInterface;
}

export interface ResultadoInterface {
  registros: RegistroInterface[];
  operacion: boolean;
  query: string;
}

export interface RegistroInterface {
  id: string;
  nombre: string;
  url_ayuda?: any;
  url_video?: string;
  descripcion: string;
  url_tramite: string;
  cve_retis?: string;
  url_ficha: string;
  id_dependencia: string;
  id_dirgral?: string;
  accesos: string;
  metadatos: string;
  id_tipo: string;
  observaciones?: any;
  FAct: string;
  fcreacion: string;
  mantenimiento: string;
  descripcion_mantenimiento?: any;
  id_clasificacion: string;
  idTramite: string;
  Dependencia: string;
  TipoTramite: string;
  Contador?: any;
}
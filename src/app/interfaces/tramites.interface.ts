export interface getTotalTramites {
  Tramites: string;
}

export interface getCategoriasInterface {
  id: string;
  descripcion: string;
  padre?: any;
  FAct: string;
  orden: string;
}

export interface getCategoriaInterface {
  id_seccion: string;
  id_tramite: string;
  priority: string;
  id: string;
  nombre: string;
  url_ayuda?: any;
  url_video?: string;
  descripcion?: string;
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
  fcreacion?: string;
  mantenimiento: string;
  descripcion_mantenimiento?: any;
  id_clasificacion: string;
  Seccion: string;
}

export interface getTramiteInterface {
  id: string;
  nombre: string;
  url_ayuda?: any;
  url_video: string;
  descripcion: string;
  url_tramite: string;
  cve_retis?: any;
  url_ficha: string;
  id_dependencia: string;
  id_dirgral: string;
  accesos: string;
  metadatos: string;
  id_tipo: string;
  observaciones?: any;
  FAct: string;
  fcreacion: string;
  mantenimiento: string;
  descripcion_mantenimiento?: any;
  id_clasificacion: string;
}

export interface getDependenciasInterface {
  id_dependencia: string;
  nombre_dependencia: string;
}

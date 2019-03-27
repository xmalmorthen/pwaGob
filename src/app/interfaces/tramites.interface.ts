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

export interface categoriasConTramitesInterface {
  id: string;
  descripcion: string;
  orden: string;
  tramites?: tramiteInterface[];
}

export interface getDependenciasInterface {
  id_dependencia: string;
  nombre_dependencia: string;
}

export interface dependenciasConTramitesInterface {
  id_dependencia: string;
  nombre_dependencia: string;
  tramites?: tramiteInterface[];
}

export interface tramiteInterface {
  id?: string;
  nombre?: string;
  url_ayuda?: any;
  url_video?: string;
  descripcion?: string;
  url_tramite?: string;
  cve_retis?: any;
  url_ficha?: string;
  id_dependencia?: string;
  id_dirgral?: string;
  accesos?: string;
  metadatos?: string;
  id_tipo?: string;
  observaciones?: any;
  FAct?: string;
  fcreacion?: string;
  mantenimiento?: string;
  descripcion_mantenimiento?: any;
  id_clasificacion?: string;
  idTramite?: string;
  Dependencia?: string;
  TipoTramite?: string;
  Contador?: string;
}


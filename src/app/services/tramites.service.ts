import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

// INTERFACES
import { getCategoriasInterface, getDependenciasInterface, tramiteInterface } from '../interfaces/tramites.interface';
import { RegistroInterface, WSBuscarTramiteInterface } from '../interfaces/WSBuscarTramite.interface';

const urlWS = 'http://www.openapis.col.gob.mx/serviciosenlinea/index.php/rest/';
const urlWSBuscarTramite = 'http://www.openapis.col.gob.mx/API_PU/index.php/Portalunico/tramiteLinea/';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {

  constructor( private http: HttpClient) {
  }

  // CATEGORIAS
  getCategorias(): Promise<getCategoriasInterface[]> {
    return new Promise ( (resolve, reject) => {
      this.http.get<getCategoriasInterface[]>(urlWS + `getCategorias/format/json`)
          .subscribe( (response: getCategoriasInterface[]) => {
              if (!response) {
                throw new HttpErrorResponse({ error: 'No se obtuvo información del servicio', status: 403, statusText: 'No se obtuvo información del servicio' });
              }

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // DEPENDENCIAS
  getDependencias(): Promise<getDependenciasInterface[]> {
    return new Promise ( (resolve, reject) => {
      this.http.get<getDependenciasInterface[]>(urlWS + `getDependencias/format/json`)
          .subscribe( (response: getDependenciasInterface[]) => {
              if (!response) {
                throw new HttpErrorResponse({ error: 'No se obtuvo información del servicio', status: 403, statusText: 'No se obtuvo información del servicio' });
              }

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // TRAMITES POR CATEGORIA
  getTramitesCategoria(idCategoria: string): Promise<tramiteInterface[]> {
    return new Promise ( (resolve, reject) => {
      this.http.get<tramiteInterface[]>(urlWS + `getCategoria/${idCategoria}/format/json`)
          .pipe(
            map( (response: any) => {

              let collection: tramiteInterface[] = [];

              response.forEach(tramite => {
                collection.push({
                  id : tramite.id_tramite,
                  nombre : tramite.nombre,
                  url_ayuda : tramite.url_ayuda,
                  url_video : tramite.url_video,
                  descripcion : tramite.descripcion,
                  url_tramite : tramite.url_tramite,
                  cve_retis : tramite.cve_retis,
                  url_ficha : tramite.url_ficha,
                  id_dependencia : tramite.id_dependencia,
                  id_dirgral : tramite.id_dirgral,
                  accesos : tramite.accesos,
                  metadatos : tramite.metadatos,
                  id_tipo : tramite.id_tipo,
                  observaciones : tramite.observaciones,
                  FAct : tramite.FAct,
                  fcreacion : tramite.fcreacion,
                  mantenimiento : tramite.mantenimiento,
                  descripcion_mantenimiento : tramite.descripcion_mantenimiento,
                  id_clasificacion : tramite.id_clasificacion,
                  idTramite : tramite.id_tramite
                });
              });

              return collection;

            })
          )
          .subscribe( (response: tramiteInterface[]) => {
              if (!response) {
                throw new HttpErrorResponse({ error: 'No se obtuvo información del servicio', status: 403, statusText: 'No se obtuvo información del servicio' });
              }

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  // TRAMITES POR DEPENDENCIA
  getTramitesDependencia(idDependencia: string): Promise<tramiteInterface[]> {
    return new Promise ( (resolve, reject) => {
      this.http.get<tramiteInterface[]>(urlWS + `getTramitesDependencia/${idDependencia}/format/json`)
          .pipe(
            map( (response: any) => {

              return response;

            })
          )
          .subscribe( (response: tramiteInterface[]) => {
              if (!response) {
                throw new HttpErrorResponse({ error: 'No se obtuvo información del servicio', status: 403, statusText: 'No se obtuvo información del servicio' });
              }

              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  getTramitesBusqueda(palabra: string): Promise<tramiteInterface[]> {
    return new Promise ( (resolve, reject) => {
      this.http.get(urlWSBuscarTramite + palabra)
          .pipe(
            map( (response: WSBuscarTramiteInterface) => {
                if (response.resultado.operacion) {
                  return response.resultado.registros;
                } else {
                  return [];
                }
            })
          )
          .subscribe( (response: tramiteInterface[]) => {
              resolve( response );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

}

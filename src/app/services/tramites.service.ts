import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

// INTERFACES
import { getCategoriasInterface, getCategoriaInterface, getDependenciasInterface } from '../interfaces/tramites.interface';

const urlWS = 'http://www.openapis.col.gob.mx/serviciosenlinea/index.php/rest/';

@Injectable({
  providedIn: 'root'
})
export class TramitesService {
  private categoriasList: getCategoriasInterface[] = [];
  private dependenciasList: getDependenciasInterface[] = [];

  private tramitesCategoria: getCategoriaInterface[] = [];

  constructor( private http: HttpClient) {
  }

  getCategorias(): Promise<getCategoriasInterface[]> {

    if ( this.categoriasList.length > 0 ) {
      return Promise.resolve( this.categoriasList );
    }

    return new Promise ( (resolve, reject) => {
      this.http.get<getCategoriasInterface[]>(urlWS + `getCategorias/format/json`)
          .subscribe( (response: getCategoriasInterface[]) => {
              if (!response) {
                throw new HttpErrorResponse({ error: 'No se obtuvo información del servicio', status: 403, statusText: 'No se obtuvo información del servicio' });
              }

              this.categoriasList = response;
              resolve( this.categoriasList );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

  getTramitesCategoria(idCategoria: string): Promise<getCategoriaInterface[]> {
    if ( this.tramitesCategoria.length > 0 ) {
      return Promise.resolve( this.tramitesCategoria );
    }

    return new Promise ( (resolve, reject) => {
      this.http.get<getCategoriaInterface[]>(urlWS + `getCategoria/${idCategoria}/format/json`)
          .subscribe( (response: getCategoriaInterface[]) => {
              if (!response) {
                throw new HttpErrorResponse({ error: 'No se obtuvo información del servicio', status: 403, statusText: 'No se obtuvo información del servicio' });
              }

              this.tramitesCategoria = response;
              resolve( this.tramitesCategoria );
            },
            (error: HttpErrorResponse) => {
              reject(error);
            }
          );
    });
  }

}

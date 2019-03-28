import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

// INTERFACES
import { secretariosInterface, dependenciaInterface } from '../interfaces/directorioIntegral.interface';

const urlWS = 'http://directoriointegral.col.gob.mx/index.php/api/rest/';

@Injectable({
  providedIn: 'root'
})
export class DirectorioIntegralService {

  constructor( private http: HttpClient) {
  }

  // SECRETARIOS
  getSecretarios(): Promise<secretariosInterface[]> {
    return new Promise ( (resolve, reject) => {
      this.http.get<secretariosInterface[]>(urlWS + `getSecretarios/format/json`)
          .subscribe( (response: secretariosInterface[]) => {
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

  // FUNCIONARIOS
  getDependencias(): Promise<dependenciaInterface[]> {
    return new Promise ( (resolve, reject) => {
      this.http.get<any>(urlWS + `getDependencias/format/json`)
          .pipe(
            map( ( response: any ) => {

              debugger;

              let collection: dependenciaInterface[] = [];

              response.forEach(item => {
                collection.push({
                  ID: '',
                  Descrip: '',
                  IdAds2: '',
                  TITULAR: ''});
              });

              return collection;

            })
          )
          .subscribe( (response: dependenciaInterface[]) => {
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

}

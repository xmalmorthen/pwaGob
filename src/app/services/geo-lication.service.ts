import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GeoLicationService {

  constructor() { }

  public getCurrentPosition() {
    return new Promise( (resolve,reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
          resolve(pos);
        }, err => {
          let msg = '';
          switch (err.code) {
            case 0:
              msg = 'Error desconocido';
              break;
            case 1:
              msg = 'Permiso denegado';
              break;
            case 2:
              msg = 'Posición desconocida';
              break;
            case 3:
              msg = 'Tiempo de espera agotado';
              break;
          }
          reject(msg);
        });
      } else {
        reject('Navegador no soporta la Geolocalización');
      }
    });
  }

}

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { KioscosRESTService, KioscoInterface } from '../interfaces/kioscos.interface';
import KioscosJSON from '../../assets/data/KioscosJSON.json';

const wsKioscos = 'https://www.secfin.col.gob.mx/wsKioscos/index.php/apiV1/obtener/kioscos.json';

@Injectable({
  providedIn: 'root'
})
export class WsKioscosService {
  private kioscosList: KioscoInterface[] = [];

  constructor( private http: HttpClient) {
  }

  getKioscosFromWs(): Promise<KioscoInterface[]> {

    if ( this.kioscosList.length > 0 ) {
      return Promise.resolve( this.kioscosList );
    }

    return new Promise ( (resolve, reject) => {
      this.http.get<KioscosRESTService>(wsKioscos)
                .subscribe(
                  (kioscosService: KioscosRESTService) => {

                    console.log(kioscosService);

                    if (!kioscosService) {
                      throw new HttpErrorResponse({ error: 'No se obtuvo información del servicio', status: 403, statusText: 'No se obtuvo información del servicio' });
                    }
                    if (kioscosService.RESTService.status_response.toLowerCase() !== 'true') {
                      throw new HttpErrorResponse({ error: kioscosService.RESTService.message, status: 403, statusText: kioscosService.RESTService.message });
                    }

                    this.kioscosList = kioscosService.response;

                    resolve( this.kioscosList );
                  },
                  (error: HttpErrorResponse) => {
                    reject(error);
                  }
                );
    });
  }

  getKioscosFromJson(): Promise<KioscoInterface[]> {

    if ( this.kioscosList.length > 0 ) {
      return Promise.resolve( this.kioscosList );
    }

    return new Promise ( (resolve) => {
      resolve(KioscosJSON);
    });
  }
}

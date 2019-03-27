import { Component, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { filter } from 'rxjs/operators';

// SERVICES
import { TramitesService } from 'src/app/services/service.index';

// INTERFACES
import { getCategoriasInterface, getCategoriaInterface } from 'src/app/interfaces/tramites.interface';


declare const $: any;
declare const M: any;
declare interface tramitesCategoriaInterface {
  idCat: string;
  tramites: getCategoriaInterface[];
}

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public categoriasList: getCategoriasInterface[] = null;
  public tramitesCategorias: tramitesCategoriaInterface[] = [];

  public tramiteCategoriasSelected: tramitesCategoriaInterface = null;

  constructor(
    private wsTramitesService: TramitesService
  ) {
    this.wsTramitesService
      .getCategorias()
      .then((categorias: getCategoriasInterface[]) => {
        this.categoriasList = categorias;
      })
      .catch(err => {});
  }

  ngOnInit() {
    const instances = M.Collapsible.init(document.getElementById('categoriaListDOM'), { inDuration: 100, outDuration: 100, onOpenStart: this.collapsibleCategoriasOnOpenStart});
  }

  collapsibleCategoriasOnOpenStart = ( event ) => {
      const idCat = event.attributes.idcat.value;

      this.getListaTramitesPorCategoria(idCat)
        .subscribe( 
          (lista:tramitesCategoriaInterface) => {
            
            lista.tramites.forEach( (tramite: getCategoriaInterface) => {
              if (tramite.descripcion)
                tramite.descripcion = tramite.descripcion.replace(/<h[^>]+>([^]*)<\/h[^>]+>.*/g,'')
            });

            debugger;
            this.tramiteCategoriasSelected = lista;
            

          },
          ( error ) => {
            
            this.tramiteCategoriasSelected = null;

          }
        );
  }


  getListaTramitesPorCategoria(idCategoria: string): Observable<tramitesCategoriaInterface>{

    return new Observable( (observer: Subscriber<tramitesCategoriaInterface> ) => {
      
      let lista: tramitesCategoriaInterface = null;

      if (this.tramitesCategorias) {
        
        this.tramitesCategorias.forEach(categoriaTramite => {
          if (categoriaTramite.idCat === idCategoria) {
            lista = categoriaTramite;
            return false;
          }
        });

      }
      
      if (lista) { 
        observer.next(lista);
        observer.complete();
      } else {
        
        this.wsTramitesService.getTramitesCategoria(idCategoria)
        .then((categorias: getCategoriaInterface[]) => {
          
            const obj = {
              idCat: idCategoria,
              tramites: categorias
            };
            
            this.tramitesCategorias.push(obj);
            lista = obj;

            observer.next(lista);
            observer.complete();
          })
          .catch(err => {
            observer.error(err);
          });
        }

      });
  }
      
}

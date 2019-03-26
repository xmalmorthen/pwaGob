import { Component, OnInit } from '@angular/core';

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

  collapsibleCategoriasOnOpenStart = (event) => {
      const idCat = event.attributes.idcat.value;

      this.tramiteCategoriasSelected = null;

      if (this.tramitesCategorias) {

        this.tramitesCategorias.forEach(categoriaTramite => {
          if (categoriaTramite.idCat === idCat) {
            this.tramiteCategoriasSelected = categoriaTramite;
            return false;
          }
        });

      }

      if (!this.tramiteCategoriasSelected) {

        this.wsTramitesService.getTramitesCategoria(idCat)
          .then((categorias: getCategoriaInterface[]) => {

            const obj = {
              // tslint:disable-next-line:object-literal-shorthand
              idCat: idCat,
              tramites: categorias
            };

            this.tramitesCategorias.push(obj);
            this.tramiteCategoriasSelected = obj;

          })
          .catch(err => {

          });

      }
  }

}

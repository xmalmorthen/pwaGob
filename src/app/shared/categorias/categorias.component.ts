import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { filter } from 'rxjs/operators';

// SERVICES
import { TramitesService } from 'src/app/services/service.index';

// INTERFACES
import { getCategoriasInterface, categoriasConTramitesInterface, getDependenciasInterface, dependenciasConTramitesInterface, tramiteInterface } from 'src/app/interfaces/tramites.interface';
import { RegistroInterface } from 'src/app/interfaces/WSBuscarTramite.interface';

// ENUMERATIONS
import { TRAMITES_FROM } from 'src/app/enumerators/TRAMITESFROM';

declare const $: any;
declare const M: any;

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  public categoriasConTramites: categoriasConTramitesInterface[] = [];
  public dependenciasConTramites: dependenciasConTramitesInterface[] = [];
  public listaTramitesSelected: tramiteInterface[] = [];

  public tramitesFrom: TRAMITES_FROM;

  public loadingTramites: boolean = false;
  public errorResponse: boolean = false;

  public palabraBuscarInput: string = '';
  public palabraBuscar: string = '';

  constructor(
    private wsTramitesService: TramitesService
  ) {
    // Obtener categorías
    this.wsTramitesService.getCategorias()
      .then( ( response: getCategoriasInterface[] ) => {
            response.forEach(categoria => {

              this.categoriasConTramites.push(
                {
                  id: categoria.id,
                  descripcion: categoria.descripcion,
                  orden: categoria.orden,
                  tramites: []
                }
              );

            });
          })
      .catch( (err) => {

      });

    // Obtener dependencias
    this.wsTramitesService.getDependencias()
      .then( ( response: getDependenciasInterface[] ) => {
            response.forEach(dependencia => {

              this.dependenciasConTramites.push(
                {
                  id_dependencia : dependencia.id_dependencia,
                  nombre_dependencia : dependencia.nombre_dependencia,
                  tramites: []
                }
              );

            });
          })
      .catch( (err) => {

      });
  }

  ngOnInit() {
    M.Dropdown.init(document.querySelectorAll('.dropdownCategoriasAnchor, .dropdownDependenciasAnchor'), { constrainWidth : false });    
  }

  categoriaItemSelect( event, idCat ) {
      this.loadingTramites = true;

      let obj: categoriasConTramitesInterface  = this.categoriasConTramites.filter(x => x.id === idCat)[0];

      this.listaTramitesSelected = [];
      this.tramitesFrom = TRAMITES_FROM.CATEGORIA;

      if (obj.tramites.length > 0) {
        this.listaTramitesSelected = obj.tramites;
        this.loadingTramites = false;
      }

      this.wsTramitesService.getTramitesCategoria(idCat)
        .then( (response: tramiteInterface[]) => {
            obj.tramites = response;
            this.listaTramitesSelected = response;
            this.loadingTramites = false;
        })
        .catch( (err) => {

        });
  }

  dependenciaItemSelect( event, idDep ) {
      this.loadingTramites = true;

      let obj: dependenciasConTramitesInterface = this.dependenciasConTramites.filter(x => x.id_dependencia === idDep)[0];

      this.listaTramitesSelected = [];
      this.tramitesFrom = TRAMITES_FROM.DEPENDENCIA;

      if (obj.tramites.length > 0) {
        this.listaTramitesSelected = obj.tramites;
        this.loadingTramites = false;
        this.errorResponse = false;
      }

      this.wsTramitesService.getTramitesDependencia(idDep)
        .then( (response: getCategoriaInterface[]) => {
            obj.tramites = response;
            this.listaTramitesSelected = response;
            this.loadingTramites = false;
            this.errorResponse = false;
        })
        .catch( (err) => {
          this.loadingTramites = false;
          this.errorResponse = true;
        });
  }

  buscarTramite( event ) {

    const palabra = event.target.value;

    this.loadingTramites = true;

    this.tramitesFrom = TRAMITES_FROM.BUSQUEDA;
    this.palabraBuscarInput = '';
    this.palabraBuscar = palabra;

    this.wsTramitesService.getTramitesBusqueda(palabra)
      .then( ( response: RegistroInterface[] ) => {

        this.listaTramitesSelected = response;
        this.loadingTramites = false;
        this.errorResponse = false;

      })
      .catch ( (err) => {
        this.loadingTramites = false;
        this.errorResponse = true;
      });

  }

}

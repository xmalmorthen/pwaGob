import { Component, OnInit, Input } from '@angular/core';

// SERVICES
import { DirectorioIntegralService } from 'src/app/services/service.index';

// INTERFACES
import { secretariosInterface } from 'src/app/interfaces/directorioIntegral.interface';

// ENUMERATIONS
import { DIRECTORIO_FROM } from 'src/app/enumerators/DIRECTORIOFROM';

@Component({
  selector: 'app-directorio',
  templateUrl: './directorio.component.html',
  styleUrls: ['./directorio.component.css']
})
export class DirectorioComponent implements OnInit {

  @Input('secretarios') secretariosSection: boolean = true;
  @Input('dependencias') dependenciasSection: boolean = true;
  @Input('busqueda') busquedaSection: boolean = true;

  public loading: boolean = false;
  public errorResponse: boolean = false;
  public actionFrom: DIRECTORIO_FROM = null;

  public collectionList: any = [];

  public buscarInput: string = '';
  public buscarDisplay: string = '';

  constructor(
    private wsDirectorio: DirectorioIntegralService
  ) {}

  ngOnInit() {
  }

  getSecretarios() {

    this.loading = true;

    this.actionFrom = DIRECTORIO_FROM.SECRETARIOS;

    this.wsDirectorio.getSecretarios()
      .then( ( response: secretariosInterface[] ) => {

          this.collectionList = response;

          this.loading = false;
          this.errorResponse = false;

      })
      .catch( (err) => {

        this.loading = false;
        this.errorResponse = true;

      });
  }

  getDependencias() {
    this.loading = true;

    this.actionFrom = DIRECTORIO_FROM.DEPENDENCIA;

    this.wsDirectorio.getSecretarios()
      .then( ( response: secretariosInterface[] ) => {

          this.collectionList = response;

          this.loading = false;
          this.errorResponse = false;

      })
      .catch( (err) => {

        this.loading = false;
        this.errorResponse = true;

      });
  }

  buscarFuncionario( event ) {

    const palabra = event.target.value;

    this.loading = true;

    this.actionFrom = DIRECTORIO_FROM.BUSQUEDA;
    this.buscarInput = '';
    this.buscarDisplay = palabra;

    // TODO - Implementar el método correcto
    // this.wsDirectorio.getSecretarios()
    //   .then( ( response: secretariosInterface[] ) => {

    //       this.collectionList = response;

    //       this.loading = false;
    //       this.errorResponse = false;

    //   })
    //   .catch( (err) => {

    //     this.loading = false;
    //     this.errorResponse = true;

    //   });

  }

}

import { NgModule } from '@angular/core';

// IMPORTS
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmDirectionModule } from 'agm-direction';

// SUB MODULES
import { SharedModule } from '../shared/shared.module';

// PAGES
import { PrincipalComponent } from './principal/principal.component';
import { TramitesServiciosComponent } from './tramites-servicios/tramites-servicios.component';
import { ContactanosComponent } from './contactanos/contactanos.component';
import { UbicanosComponent } from './ubicanos/ubicanos.component';
import { DirectorioGobiernoComponent } from './directorio-gobierno/directorio-gobierno.component';

@NgModule({
  declarations: [
    PrincipalComponent,
    TramitesServiciosComponent,
    ContactanosComponent,
    UbicanosComponent,
    DirectorioGobiernoComponent
  ],
  exports: [
    PrincipalComponent,
    TramitesServiciosComponent,
    ContactanosComponent,
    UbicanosComponent,
    DirectorioGobiernoComponent
  ],
  imports : [
    CommonModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxWmnsWgwatmiF98NOAEbaVHVP_9PPdOc'
    }),
    AgmDirectionModule,
    SharedModule
  ],
  providers: [
    GoogleMapsAPIWrapper
  ]
})
export class PagesModule { }

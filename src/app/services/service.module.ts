import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  GeoLicationService,
  WsKioscosService,
  TramitesService,
  DirectorioIntegralService
} from './service.index';

@NgModule({
  imports: [
    CommonModule
  ],
  providers : [
    GeoLicationService,
    WsKioscosService,
    TramitesService,
    DirectorioIntegralService
  ],
  declarations: []
})
export class ServiceModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  GeoLicationService,
  WsKioscosService,
  TramitesService
} from "./service.index";

@NgModule({
  imports: [
    CommonModule
  ],
  providers : [
    GeoLicationService,
    WsKioscosService,
    TramitesService
  ],
  declarations: []
})
export class ServiceModule { }

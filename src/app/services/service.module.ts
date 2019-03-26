import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {  
  GeoLicationService,
  WsKioscosService
} from "./service.index";

@NgModule({
  imports: [
    CommonModule
  ],
  providers :[
    GeoLicationService,
    WsKioscosService
  ],
  declarations: []
})
export class ServiceModule { }

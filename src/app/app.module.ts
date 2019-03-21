import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule } from '@angular/forms';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { AgmSnazzyInfoWindowModule } from '@agm/snazzy-info-window';

import { PrincipalComponent } from './pages/principal/principal.component';
import { TramitesServiciosComponent } from './pages/tramites-servicios/tramites-servicios.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { UbicanosComponent } from './pages/ubicanos/ubicanos.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,

    PrincipalComponent,
    TramitesServiciosComponent,
    ContactanosComponent,
    UbicanosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDxWmnsWgwatmiF98NOAEbaVHVP_9PPdOc'
    }),
    AgmSnazzyInfoWindowModule
  ],
  providers: [
    GoogleMapsAPIWrapper
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

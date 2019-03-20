import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { PrincipalComponent } from './pages/principal/principal.component';
import { TramitesServiciosComponent } from './pages/tramites-servicios/tramites-servicios.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { UbicanosComponent } from './pages/ubicanos/ubicanos.component';

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
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

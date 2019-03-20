import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { TramitesServiciosComponent } from './pages/tramites-servicios/tramites-servicios.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { UbicanosComponent } from './pages/ubicanos/ubicanos.component';

const routes: Routes = [
  { path: '', component: PrincipalComponent },
  { path: 'tramitesyServicios', component: TramitesServiciosComponent },
  { path: 'contacto', component: ContactanosComponent },
  { path: 'ubicanos', component: UbicanosComponent },
  { path: '**', component: PrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { TramitesServiciosComponent } from './pages/tramites-servicios/tramites-servicios.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { UbicanosComponent } from './pages/ubicanos/ubicanos.component';

const routes: Routes = [
  { path: 'principal', component: PrincipalComponent, data: { title: 'Página principal'} },
  { path: 'tramitesyServicios', component: TramitesServiciosComponent, data: { title: 'Trámites y Servicios'} },
  { path: 'contacto', component: ContactanosComponent, data: { title: 'Contáctanos'} },
  { path: 'ubicanos', component: UbicanosComponent, data: { title: 'Ubícanos'} },
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: '**', redirectTo: '/principal' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

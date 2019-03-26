import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrincipalComponent } from './pages/principal/principal.component';
import { TramitesServiciosComponent } from './pages/tramites-servicios/tramites-servicios.component';
import { ContactanosComponent } from './pages/contactanos/contactanos.component';
import { UbicanosComponent } from './pages/ubicanos/ubicanos.component';

const routes: Routes = [
  { path: 'principal', component: PrincipalComponent },
  { path: 'tramitesyServicios', component: TramitesServiciosComponent },
  { path: 'contacto', component: ContactanosComponent },
  { path: 'ubicanos', component: UbicanosComponent },
  { path: '', redirectTo: '/principal', pathMatch: 'full' },
  { path: '**', component: PrincipalComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';

// IMPORTS
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PAGES
import { CategoriasComponent } from './categorias/categorias.component';
import { DirectorioComponent } from './directorio/directorio.component';

@NgModule({
  declarations: [
    CategoriasComponent,
    DirectorioComponent
  ],
  exports: [
    CategoriasComponent,
    DirectorioComponent
  ],
  imports : [
    CommonModule,
    FormsModule
  ],
  providers: []
})
export class SharedModule { }

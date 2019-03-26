import { NgModule } from '@angular/core';

// IMPORTS
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// PAGES
import { CategoriasComponent } from './categorias/categorias.component';

@NgModule({
  declarations: [
    CategoriasComponent
  ],
  exports: [
    CategoriasComponent
  ],
  imports : [
    CommonModule,
    FormsModule
  ],
  providers: []
})
export class SharedModule { }

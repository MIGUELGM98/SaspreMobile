import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InsecticidasEditarPageRoutingModule } from './insecticidas-editar-routing.module';

import { InsecticidasEditarPage } from './insecticidas-editar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InsecticidasEditarPageRoutingModule
  ],
  declarations: [InsecticidasEditarPage]
})
export class InsecticidasEditarPageModule {}
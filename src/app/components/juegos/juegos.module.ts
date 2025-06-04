import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { juegosRoutes } from './juegos.routes';

@NgModule({
  imports: [RouterModule.forChild(juegosRoutes)],
})
export class JuegosModule {}

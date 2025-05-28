import { Routes } from '@angular/router';
import { AhorcadoComponent } from './ahorcado/ahorcado.component';
import { BuscaminasComponent } from './buscaminas/buscaminas.component';
import { MayormenorComponent } from './mayormenor/mayormenor.component';
import { PreguntadosComponent } from './preguntados/preguntados.component';

export const juegosRoutes: Routes = [
  { path: 'ahorcado', component: AhorcadoComponent },
  { path: 'buscaminas', component: BuscaminasComponent },
  { path: 'mayoromenor', component: MayormenorComponent },
  { path: 'preguntados', component: PreguntadosComponent },
];

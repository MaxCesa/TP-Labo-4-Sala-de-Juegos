// components/juegos/juegos.routes.ts
import { Routes } from '@angular/router';

export const juegosRoutes: Routes = [
  {
    path: 'ahorcado',
    loadComponent: () =>
      import('./ahorcado/ahorcado.component').then((m) => m.AhorcadoComponent),
  },
  {
    path: 'mayoromenor',
    loadComponent: () =>
      import('./mayormenor/mayormenor.component').then(
        (m) => m.MayormenorComponent
      ),
  },
  {
    path: 'preguntados',
    loadComponent: () =>
      import('./preguntados/preguntados.component').then(
        (m) => m.PreguntadosComponent
      ),
  },
  {
    path: 'buscaminas',
    loadComponent: () =>
      import('./buscaminas/buscaminas.component').then(
        (m) => m.BuscaminasComponent
      ),
  },
];

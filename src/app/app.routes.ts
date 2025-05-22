import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AhorcadoComponent } from './components/juegos/ahorcado/ahorcado.component';
import { MayormenorComponent } from './components/juegos/mayormenor/mayormenor.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { Preguntados2Component } from './components/juegos/preguntados2/preguntados2.component';
import { BuscaminasComponent } from './components/juegos/buscaminas/buscaminas.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';
import { TetrisComponent } from './components/juegos/tetris/tetris.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'quien-soy', component: QuienSoyComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'chat', component: ChatroomComponent },
  {
    path: 'juegos/ahorcado',
    loadComponent: () =>
      import('./components/juegos/ahorcado/ahorcado.component').then(
        (m) => m.AhorcadoComponent
      ),
  },
  {
    path: 'juegos/mayoromenor',
    loadComponent: () =>
      import('./components/juegos/mayormenor/mayormenor.component').then(
        (m) => m.MayormenorComponent
      ),
  },
  {
    path: 'juegos/preguntados',
    loadComponent: () =>
      import('./components/juegos/preguntados/preguntados.component').then(
        (m) => m.PreguntadosComponent
      ),
  },
  {
    path: 'juegos/buscaminas',
    loadComponent: () =>
      import('./components/juegos/buscaminas/buscaminas.component').then(
        (m) => m.BuscaminasComponent
      ),
  },
  { path: 'encuesta', component: EncuestaComponent },
  {
    path: 'puntuacion',
    loadComponent: () =>
      import('./components/scoreboard/scoreboard.component').then(
        (m) => m.ScoreboardComponent
      ),
  },
];

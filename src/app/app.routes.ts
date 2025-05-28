import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AhorcadoComponent } from './components/juegos/ahorcado/ahorcado.component';
import { MayormenorComponent } from './components/juegos/mayormenor/mayormenor.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';
import { PreguntadosComponent } from './components/juegos/preguntados/preguntados.component';
import { BuscaminasComponent } from './components/juegos/buscaminas/buscaminas.component';
import { EncuestaComponent } from './components/encuesta/encuesta.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'quien-soy', component: QuienSoyComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'chat', component: ChatroomComponent },
  {
    path: 'juegos',
    loadChildren: () =>
      import('./components/juegos/juegos.routes').then((m) => m.juegosRoutes),
  },
  { path: 'encuesta', component: EncuestaComponent },
  {
    path: 'puntuacion',
    loadComponent: () =>
      import('./components/scoreboard/scoreboard.component').then(
        (m) => m.ScoreboardComponent
      ),
  },
  { path: 'chat', component: ChatroomComponent },
];

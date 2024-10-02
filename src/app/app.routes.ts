import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { HomeComponent } from './components/home/home.component';
import { RegistroComponent } from './components/registro/registro.component';
import { AhorcadoComponent } from './components/juegos/ahorcado/ahorcado.component';
import { MayormenorComponent } from './components/juegos/mayormenor/mayormenor.component';
import { ChatroomComponent } from './components/chatroom/chatroom.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'auth', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'quien-soy', component: QuienSoyComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'chat', component: ChatroomComponent },
  { path: 'juegos/ahorcado', component: AhorcadoComponent },
  { path: 'juegos/mayoromenor', component: MayormenorComponent },
];

import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { QuienSoyComponent } from './components/quien-soy/quien-soy.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'quien-soy', component: QuienSoyComponent },

  { path: 'bienvenido', component: BienvenidoComponent },
];

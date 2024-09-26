import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  template: '<app-navbar></app-navbar><router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'TP-Sala-De-Juegos';
}

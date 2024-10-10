import { Component } from '@angular/core';
import {
  Router,
  RouterOutlet,
  RouterLink,
  RouterLinkActive,
  NavigationEnd,
} from '@angular/router';
import { filter } from 'rxjs/operators';
import { NavbarComponent } from './components/navbar/navbar.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NavbarComponent,
    CommonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  template:
    '<app-navbar *ngIf="showNavbar"></app-navbar><router-outlet></router-outlet>',
})
export class AppComponent {
  title = 'TP-Sala-De-Juegos';

  showNavbar = true;

  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.checkNavbarVisibility(event.urlAfterRedirects);
      });
  }

  checkNavbarVisibility(url: string): void {
    const hideNavbarRoutes = ['/', '/auth', '/registro'];

    this.showNavbar = !hideNavbarRoutes.includes(url);
  }
}

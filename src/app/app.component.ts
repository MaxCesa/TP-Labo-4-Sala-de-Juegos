import { Component } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { firebaseConfig } from '../enviroments/enviroments';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'TP-Sala-De-Juegos';
}

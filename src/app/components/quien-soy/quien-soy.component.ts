import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quien-soy',
  templateUrl: './quien-soy.component.html',
  styleUrls: ['./quien-soy.component.scss'],
  standalone: true,
  imports: [MatIconModule],
})
export class QuienSoyComponent {
  constructor(private router: Router) {}

  async toHome() {
    this.router.navigateByUrl('/home');
  }
}

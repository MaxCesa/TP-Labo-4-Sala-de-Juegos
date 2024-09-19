import { Component, inject, OnInit } from '@angular/core';
import { Auth, getAuth, User, onAuthStateChanged } from '@angular/fire/auth';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  user: User | null;
  userName: string;
  private auth = inject(Auth);
  constructor(private router: Router) {
    this.user = this.auth.currentUser;
    this.userName = '';
  }

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      this.user?.email
        ? (this.userName = this.user.email)
        : (this.userName = 'Guest');
    });
  }

  async toQuienSoy() {
    await this.router.navigateByUrl('/quien-soy');
  }

  async logOff() {
    await this.auth.signOut().then(() => {
      this.router.navigateByUrl('');
    });
  }
}

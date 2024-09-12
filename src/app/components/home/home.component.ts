import { Component, OnInit } from '@angular/core';
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
  auth: Auth;
  user: User | null;
  userName: string;

  constructor(private router: Router) {
    this.auth = getAuth();
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
}

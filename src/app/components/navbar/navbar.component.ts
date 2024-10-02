import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, User, onAuthStateChanged } from '@angular/fire/auth';
import { Router, RouterLink, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  user: User | null;
  userName: string | null;
  private auth = inject(Auth);
  constructor(private router: Router) {
    this.user = this.auth.currentUser;
    this.userName = '';
  }

  ngOnInit() {
    onAuthStateChanged(this.auth, (user) => {
      this.user?.email
        ? (this.userName = this.user.email)
        : (this.userName = null);
    });
  }

  async logOff() {
    await this.auth.signOut().then(() => {
      this.router.navigate(['']);
    });
  }
}

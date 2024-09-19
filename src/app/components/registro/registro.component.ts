import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  private fireAuth = inject(Auth);
  constructor(private router: Router) {}

  pswdDontMatch: boolean = false;
  mailAlreadyRegistered: boolean = false;

  ngOnInit(): void {}

  async register(email: any, pass: any, confirm: any) {
    if (pass !== confirm) {
      this.pswdDontMatch = true;
    } else {
      this.pswdDontMatch = false;
      try {
        const user = await createUserWithEmailAndPassword(
          this.fireAuth,
          email,
          pass
        );
        if (user) {
          this.router.navigateByUrl('/home');
        }
      } catch (error: any) {
        if (
          error instanceof FirebaseError &&
          error.code === 'auth/email-already-in-use'
        ) {
          this.mailAlreadyRegistered = true;
        } else {
          console.error('Registration error:', error);
        }
      }
    }
  }
}

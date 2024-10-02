import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Auth, createUserWithEmailAndPassword } from '@angular/fire/auth';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { FirebaseError } from 'firebase/app';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.scss',
})
export class RegistroComponent {
  private fireAuth = inject(Auth);
  constructor(private router: Router) {}
  errorRegistering: boolean = false;
  errorLabel: string = '';

  ngOnInit(): void {}

  async register(email: any, pass: any, confirm: any) {
    this.errorRegistering = false;
    if (pass !== confirm) {
      this.errorLabel = 'Las contraseñas no coinciden.';
      this.errorRegistering = true;
    } else {
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
        if (error instanceof FirebaseError) {
          switch (error.code) {
            case 'auth/email-already-in-use':
              this.errorLabel = 'Este correo electronico ya esta registrado.';
              break;
            case 'auth/weak-password':
              this.errorLabel =
                'La contraseña es muy debil. Usa mas de 6 caracteres.';
              break;
            default:
              this.errorLabel =
                'Error registrandose. Pruebe de nuevo mas tarde.';
              break;
          }
        } else {
          this.errorLabel = 'Error registrandose. Pruebe de nuevo mas tarde.';
        }
        this.errorRegistering = true;
      }
    }
  }
}

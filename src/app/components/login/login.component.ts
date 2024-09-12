import { Component, inject } from '@angular/core';
import { Auth, signInWithEmailAndPassword } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [],
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  constructor(private router: Router) {}
  private fireAuth = inject(Auth);
  async login(email: any, pass: any) {
    const user = await signInWithEmailAndPassword(
      this.fireAuth,
      email,
      pass
    ).catch(function (error) {});
    if (user) {
      localStorage.setItem('user', JSON.stringify(user.user?.email));
      await this.router.navigateByUrl('/home');
    } else {
      alert('Mal credenciales');
    }
  }
}

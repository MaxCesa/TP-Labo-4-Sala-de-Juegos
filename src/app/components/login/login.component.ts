import { Component, inject } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  UserCredential,
} from '@angular/fire/auth';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
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
  private firestore = inject(Firestore);
  async login(email: any, pass: any) {
    const user = await signInWithEmailAndPassword(
      this.fireAuth,
      email,
      pass
    ).catch(function (error) {});
    if (user) {
      localStorage.setItem('user', JSON.stringify(user.user?.email));
      this.logLogin(user);
      await this.router.navigateByUrl('/home');
    } else {
      alert('Malas credenciales');
    }
  }

  private async logLogin(user: UserCredential) {
    const loginData = {
      Usuario: user.user.email,
      LogInTime: new Date(),
    };

    await addDoc(collection(this.firestore, 'LogIn-Logs'), loginData)
      .then(() => {
        console.log('Login logged successfully');
      })
      .catch((error) => {
        console.error('Error logging login: ', error);
      });
  }

  async toRegistro() {
    await this.router.navigateByUrl('/registro');
  }
}

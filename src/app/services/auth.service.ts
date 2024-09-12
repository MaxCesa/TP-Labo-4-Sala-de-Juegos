import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth) {}

  async register(email: any, password: any) {
    try {
      const user = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );
      return user;
    } catch (e) {
      return null;
    }
  }

  async login(email: any, password: any) {
    try {
      const user = await signInWithEmailAndPassword(this.auth, email, password);
      return user;
    } catch (e) {
      alert(e);
      return null;
    }
  }

  logout() {
    return signOut(this.auth);
  }

  async getCurrentUser() {
    try {
      const user = await this.auth.currentUser;
      return user;
    } catch (e) {
      alert(e);
      return null;
    }
  }
}

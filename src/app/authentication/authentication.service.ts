import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { map, of } from 'rxjs';

export type Role = 'admin' | 'user';
export interface User {
  userName: string;
  password: string;
  role: Role;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  _http = inject(HttpClient);
  _router = inject(Router);
  isAuth = false;
  role: Role | undefined = undefined;
  login() {
    return this._http
      .get<{ users: User[] }>('/assets/user.json')
      .pipe(map((e: { users: User[] }) => e.users));
  }
  autoAuth() {
    const user = JSON.parse(localStorage.getItem('user') ?? '');
    if (user) {
      this.role = user.role;
      this.isAuth = true;
    }
  }

  logout() {
    console.log('logout!!');

    this.isAuth = false;
    this.role = undefined;
    localStorage.removeItem('user');
    this._router.navigate(['/login']);
  }
}

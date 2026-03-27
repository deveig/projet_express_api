import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuth$ = new BehaviorSubject<boolean>(false);
  private authToken = '';
  private userId = '';
  private http = inject(HttpClient);
  private router: Router = inject(Router);

  createUser(email: string, password: string) {
    return this.http
      .post<{
        message: string;
      }>('/security/api/auth/signup', {
        email: email,
        password: password,
      })
      .pipe(
        catchError((error) => {
          throw error.error.message;
        }),
      );
  }

  getToken() {
    return this.authToken;
  }

  getUserId() {
    return this.userId;
  }

  loginUser(email: string, password: string) {
    return this.http
      .post<{
        userId: string;
        token: string;
      }>('/security/api/auth/login', {
        email: email,
        password: password,
      })
      .pipe(
        tap(({ userId, token }) => {
          this.userId = userId;
          this.authToken = token;
          this.isAuth$.next(true);
        }),
        catchError((error) => {
          throw error.error.message;
        }),
      );
  }

  logout() {
    this.authToken = '';
    this.userId = '';
    this.isAuth$.next(false);
    this.router.navigate(['/login']);
  }
}

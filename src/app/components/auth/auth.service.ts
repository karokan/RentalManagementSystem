import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './auth-data.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, role: string, password: string) {
    const authData: AuthData = {
      email: email,
      role: role,
      password: password,
    };
    return this.http
      .post('http://localhost:3000/api/auth/signup', authData)
      .subscribe(
        () => {
          this.router.navigate['/'];
        },
        (error) => {
          this.authStatusListener.next(false);
          alert('Register Failed');
        }
      );
  }

  login(email: string, role: string, password: string) {
    const authData: AuthData = {
      email: email,
      role: role,
      password: password,
    };
    this.http
      .post<{ token: string; role: String; expiresIn: number }>(
        'http://localhost:3000/api/auth/login',
        authData
      )
      .subscribe(
        (response) => {
          console.log(response);
          const token = response.token;
          this.token = token;

          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);

            this.saveAuthData(token, expirationDate);
            if (response.role == 'admin') {
              this.router.navigate(['/']);
            } else if (response.role == 'owner') {
              this.router.navigate(['/benefits']);
            } else if (response.role == 'tenant') {
              this.router.navigate(['/tenant/home']);
            }
          }
        },
        (error) => {
          this.authStatusListener.next(false);
          alert('Login Failed');
        }
      );
  }

  ///////////// OSOBNY LOGIN DO OWNERA //////////////////////////////

  loginOwner(email: string, role: string, password: string) {
    const authData: AuthData = {
      email: email,
      role: role,
      password: password,
    };
    this.http
      .post<{ token: string; role: String; expiresIn: number }>(
        'http://localhost:3000/api/auth/loginOwner',
        authData
      )
      .subscribe(
        (response) => {
          console.log(response);
          const token = response.token;
          this.token = token;

          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.authStatusListener.next(true);
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);

            this.saveAuthData(token, expirationDate);
            if (response.role == 'admin') {
              this.router.navigate(['/']);
            } else if (response.role == 'owner') {
              this.router.navigate(['/owner/home']);
            } else if (response.role == 'tenant') {
              this.router.navigate(['/tenant/home']);
            }
          }
        },
        (error) => {
          this.authStatusListener.next(false);
          alert('Login Failed');
        }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.router.navigate(['/']);
    this.clearAuthData();
    clearTimeout(this.tokenTimer);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  private getAuthData() {
    const token = localStorage.getItem('token');
    const expirationDate = localStorage.getItem('expiration');

    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
    };
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from "rxjs/operators";
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

const base_url = environment.base_url;
declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public auth2;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit()
  }

  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  googleInit() {
    return new Promise<void>(resolve => {
      gapi.load('auth2', () => {
        // Retrieve the singleton for the GoogleAuth library and set up the client.
        this.auth2 = gapi.auth2.init({
          client_id: '113154742105-sejm8otbn6ucm5lkkmocs4cuhb6kdrcj.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve()
      });

    })
  }
  login(formData: LoginForm) {
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }
  loginGoogle(token: string) {
    return this.http.post(`${base_url}/login/google`, { token })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  validateToken(): Observable<boolean> {

    const token = localStorage.getItem('token') || ''
    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': token
      }
    })
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        }),
        map(resp => true),
        catchError(err => of(false))
      )
  }

  logout() {
    localStorage.removeItem('token')

    this.auth2.signOut().then(() => {
      this.ngZone.run(() => this.router.navigateByUrl('/login'))
    });

  }
}

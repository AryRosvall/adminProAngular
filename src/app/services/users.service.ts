import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap, map, catchError } from "rxjs/operators";
import { RegisterForm } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';
import { User } from '../models/user.model';

const base_url = environment.base_url;
declare const gapi;

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  public auth2;
  public user: User;
  public headers: HttpHeaders;
  public token: string;

  constructor(private http: HttpClient, private router: Router, private ngZone: NgZone) {
    this.googleInit()
    this.token = this.getToken
  }

  get getToken() {
    return localStorage.getItem('token') || ''
  }

  get getUid() {
    return this.user.uid || ''
  }

  set setToken(token) {
    localStorage.setItem('token', token)
  }
  createUser(formData: RegisterForm) {
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap((resp: any) => {
          localStorage.setItem('token', resp.token)
        })
      )
  }

  updateUser(data: { name: string, email: string, role: string }) {

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'x-token': this.getToken
    })

    data = {
      ...data,
      role: this.user.role
    }

    return this.http.put(`${base_url}/users/${this.getUid}`, data, { headers })
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
          localStorage.setItem('token', token)
        })
      )
  }

  validateToken(): Observable<boolean> {
    const token = this.getToken || ''

    return this.http.get(`${base_url}/login/renew`, { headers: { 'x-token': token } })
      .pipe(
        map((resp: any) => {
          const { name, email, google, uid, role, img = '' } = resp.user;
          this.user = new User(name, email, google, role, uid, img, '')
          localStorage.setItem('token', token)
          return true
        }),
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

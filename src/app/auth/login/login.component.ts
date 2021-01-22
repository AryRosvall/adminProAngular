import { Component, NgZone, OnInit } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  public formSubmitted = false;
  public auth2: any;

  public loginForm = this.fb.group({
    email: [localStorage.getItem('email') || '', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(4)]],
    rememberMe: [localStorage.getItem('rememberMe')]
  })

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router, private ngZone: NgZone) { }

  ngOnInit(): void {
    this.renderButton()
  }

  invalidField(field: string): boolean {
    return this.loginForm.get(field).invalid && this.formSubmitted ? true : false
  }

  login() {
    this.formSubmitted = true;

    if (this.loginForm.invalid) {
      return
    }

    this.userService.login(this.loginForm.value)
      .subscribe((resp) => {
        if (this.loginForm.get('rememberMe').value) {
          localStorage.setItem('email', this.loginForm.get('email').value)
          localStorage.setItem('rememberMe', this.loginForm.get('rememberMe').value)
        } else {
          localStorage.removeItem('email')
          localStorage.removeItem('rememberMe')
        }

        this.router.navigateByUrl('/')
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }




  renderButton() {
    gapi.signin2.render('googleSignin', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });
    this.startApp()
  }

  async startApp() {
    await this.userService.googleInit()
    this.auth2 = this.userService.auth2
    this.attachSignin(document.getElementById('googleSignin'));
  }
  attachSignin(element) {
    console.log(element.id);
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {
        const idToken = googleUser.getAuthResponse().id_token;
        this.userService.loginGoogle(idToken).subscribe(resp => this.ngZone.run(() => this.router.navigateByUrl('/')))


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

}

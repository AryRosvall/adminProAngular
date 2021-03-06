import { Component } from '@angular/core';
import Swal from 'sweetalert2'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css'
  ]
})
export class RegisterComponent {

  public formSubmitted = false;

  public registerForm = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    password2: ['', [Validators.required, Validators.minLength(6)]],
    terms: [false, [Validators.required]],
  }, {
    validators: [
      this.samePasswords('password', 'password2'),
      this.validateTerms('terms')
    ]
  })

  constructor(private fb: FormBuilder, private userService: UsersService, private router: Router) { }

  createUser() {
    this.formSubmitted = true;

    console.log(this.registerForm)
    if (this.registerForm.invalid) {
      return
    }
    this.userService.createUser(this.registerForm.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/')
      }, (err) => {
        console.log(err)
        Swal.fire('Error', err.error.msg, 'error')
      })
  }

  invalidField(field: string): boolean {
    return this.registerForm.get(field).invalid && this.formSubmitted ? true : false
  }

  acceptTerms(): boolean {
    return !this.registerForm.get('terms').value && this.formSubmitted
  }

  invalidPasswords(): boolean {

    const pass = this.registerForm.get('password').value
    const pass2 = this.registerForm.get('password2').value

    return pass !== pass2 && this.formSubmitted ? true : false
  }
  invalidMinLengthPasswords(): boolean {
    const pass = this.registerForm.get('password').invalid
    const pass2 = this.registerForm.get('password2').invalid
    return (pass || pass2) && this.formSubmitted ? true : false
  }


  samePasswords(pass1: string, pass2: string) {
    return (formGroup: FormGroup) => {
      const pass1Control = formGroup.get(pass1);
      const pass2Control = formGroup.get(pass2);
      if (pass1Control.value === pass2Control.value) {
        pass2Control.setErrors(null)
      } else {
        pass2Control.setErrors({ notEqual: true })
      }
    }
  }
  validateTerms(terms: string) {
    return (formGroup: FormGroup) => {
      const termsControl = formGroup.get(terms);
      if (termsControl.value) {
        termsControl.setErrors(null)
      } else {
        termsControl.setErrors({ declineTerms: true })
      }
    }
  }

}

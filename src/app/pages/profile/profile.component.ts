import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup
  public user: User

  constructor(private fb: FormBuilder, private userService: UsersService) {

    this.user = this.userService.user
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [this.user.name, [Validators.required]],
      email: [this.user.email, [Validators.required, Validators.email]]
    })

    this.user = this.userService.user
  }

  updateProfile() {
    this.userService.updateUser(this.profileForm.value)
      .subscribe((resp): any => {
        const { user } = resp
        this.user.name = user.name
        this.user.email = user.email
        Swal.fire('Success', "Your information has been updated", 'success')
      }), (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      }
  }

}

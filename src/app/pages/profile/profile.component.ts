import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';
import { FilesService } from 'src/app/services/files.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup
  public user: User
  public imageToUpload: File
  public imgTemp: any

  constructor(private fb: FormBuilder, private userService: UsersService, private filesService: FilesService) {

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
      .subscribe((resp) => {
        const { name, email } = this.profileForm.value
        this.user.name = name
        this.user.email = email
        Swal.fire('Success', "Your information has been updated", 'success')
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error')
      })
  }

  changeImage(file) {
    if (!file) { return this.imgTemp = null }
    this.imageToUpload = file
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      this.imgTemp = reader.result
    }
  }

  uploadFile() {
    this.filesService.updatePhoto(this.imageToUpload, 'users', this.user.uid)
      .then(resp => {
        if (resp) {
          this.user.img = resp
          this.imageToUpload = null
          Swal.fire('Success', "Your photo has been updated", 'success')
        }
      }).catch(err => Swal.fire('Error', err, 'error'))
  }

}

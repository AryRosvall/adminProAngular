import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SearchService } from 'src/app/services/search.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public usersTotal: number = 0
  public users: User[] = []
  public usersTemp: User[] = []
  public startingPage = 0
  public loading
  public currentUserUid = ''

  constructor(private userService: UsersService, private searchService: SearchService) { }

  ngOnInit(): void {
    this.currentUserUid = this.userService.getUid
    this.getUsers()
  }

  getUsers() {
    this.loading = true
    this.userService.getUsers(this.startingPage)
      .subscribe(({ total, users }) => {
        this.usersTotal = total
        if (users.length !== 0) {
          this.users = users
          this.usersTemp = this.users
        }
        this.loading = false
      })
  }

  deleteUser(user: User) {

    if (user.uid === this.userService.getUid) {
      return
    }

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(user.uid)
          .subscribe(({ ok, msg }) => {
            if (ok) {
              Swal.fire(
                'User deleted',
                `${user.name} has been deleted.`,
                'success'
              )

              this.getUsers()
            } else {
              Swal.fire(
                'Error',
                msg,
                'error'
              )
            }
          })
      }
    })
  }

  changePage(value: number) {
    this.startingPage += value
    if (this.startingPage < 0) {
      this.startingPage = 0
    } else if (this.startingPage > this.usersTotal) {
      this.startingPage = this.usersTotal - value
    }
    this.getUsers()
  }

  changeRole(user) {
    this.userService.updateUser(user)
      .subscribe(resp => {
        if (!resp.ok) {
          Swal.fire('Error', resp.msg, 'error')
        }
      })
  }

  searchUsers(searchValue) {
    if (searchValue.length === 0) {
      this.users = this.usersTemp
      return
    }
    this.loading = true
    this.searchService.search('users', searchValue)
      .subscribe(resp => {

        this.users = resp
        this.loading = false

      })
  }

}

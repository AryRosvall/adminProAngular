import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styles: [
  ]
})
export class UsersComponent implements OnInit {

  public usersTotal: number = 0
  public users: User[] = []
  public startingPage = 0
  public loading

  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getUsers()
  }

  getUsers() {
    this.loading = true
    this.userService.getUsers(this.startingPage)
      .subscribe(({ total, users }) => {
        this.usersTotal = total
        if (users.length !== 0) {
          this.users = users
        }
        this.loading = false
      })
  }

  changePage(value: number) {
    this.startingPage += value
    if (this.startingPage < 0) {
      this.startingPage = 0
    } else if (this.startingPage > this.usersTotal) {
      this.startingPage -= value
    }
    this.getUsers()
  }

}

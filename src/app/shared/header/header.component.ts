import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  public user: User
  constructor(private userService: UsersService) {
    this.user = this.userService.user
  }

  logout() {
    this.userService.logout()
  }

}

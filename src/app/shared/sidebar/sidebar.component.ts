import { Component } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { SidebarService } from 'src/app/services/sidebar.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public menuItems: any[]
  public user: User

  constructor(private sidebarService: SidebarService, private userService: UsersService) {
    this.menuItems = this.sidebarService.menu
    this.user = this.userService.user
  }


}

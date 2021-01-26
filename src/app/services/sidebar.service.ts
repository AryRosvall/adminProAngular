import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      title: 'Dashboard',
      icon: 'mdi mdi-gauge',
      submenu: [
        { title: 'Graphics', url: 'graphic1' },
        { title: 'Main', url: '/' },
        { title: 'Progress Bar', url: 'progress' },
        { title: 'Promises', url: 'promises' },
        { title: 'RxJs', url: 'rxjs' },
      ]
    },
    {
      title: 'Manteinance',
      icon: 'mdi mdi-folder-lock-open',
      submenu: [
        { title: 'Users', url: 'users' },
        { title: 'Hospitals', url: 'hospitals' },
        { title: 'Doctors', url: 'doctors' },
      ]
    }
  ];

  constructor() { }
}

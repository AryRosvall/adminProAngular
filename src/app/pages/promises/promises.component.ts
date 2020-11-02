import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    this.getUsers()
      .then(users => console.log(users));
  }

  getUsers(): Promise<[]> {

    const promise = new Promise<[]>((resolve, reject) => {

      fetch('https://reqres.in/api/users')
        .then(res => res.json())
        .then(body => resolve(body.data));
    });

    return promise;
  }

}

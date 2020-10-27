import { Component } from '@angular/core';


@Component({
  selector: 'app-graphic1',
  templateUrl: './graphic1.component.html',
  styles: [
  ]
})
export class Graphic1Component {

  public labels1 = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  public data1 = [
    [350, 450, 100],
  ];
  public labels2 = ['Download Shopping ', 'In-Store Shopping', 'Mail-Order Shopping'];
  public data2 = [
    [55, 40, 5],
  ];

}

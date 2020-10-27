import { Component, Input } from '@angular/core';
import { MultiDataSet, Label, Color } from 'ng2-charts';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent {

  @Input() labels: Label[] = ['Label 1', 'Label 2', 'Label 3'];
  @Input() data = [
    [350, 450, 100],
  ];
  @Input() title = 'Sin título';

  /*  public doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
   public doughnutChartData: MultiDataSet = [
     [350, 450, 100],
   ];
  */
  public colors: Color[] = [
    { backgroundColor: ['#6857E6', '#009FEE', '#F02059'] }
  ];


}

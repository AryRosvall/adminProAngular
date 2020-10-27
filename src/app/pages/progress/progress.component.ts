import { Component } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [
    './progress.component.css'
  ]
})
export class ProgressComponent {

  progress1 = 25;
  progress2 = 40;

  get getProgress1(): string {
    return `${this.progress1}%`;
  }

  get getProgress2(): string {
    return `${this.progress2}%`;
  }

  changedChildValue(value: number): void {
    console.log("hey", value);
  }
}

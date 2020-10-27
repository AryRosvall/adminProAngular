import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-increment-bar',
  templateUrl: './increment-bar.component.html',
  styles: [
  ]
})
export class IncrementBarComponent implements OnInit {


  // Example of renaming variable
  // @Input('valueProgress') progress = 50;
  // tslint:disable-next-line: no-input-rename
  @Input('value') progress = 50;
  // tslint:disable-next-line: no-output-rename
  @Output('value') valueOutput: EventEmitter<number> = new EventEmitter();

  @Input() btnClass = 'btn-primary';

  ngOnInit(): void {
    this.btnClass = `btn ${this.btnClass}`;

  }
  get getPercentage(): string {
    return `${this.progress}%`;
  }

  changeValue(value: number): number {
    if (this.progress >= 100 && value >= 0) {
      this.valueOutput.emit(100);
      return this.progress = 100;
    }

    if (this.progress <= 0 && value < 0) {
      this.valueOutput.emit(0);
      return this.progress = 0;
    }

    this.progress = this.progress + value;
    this.valueOutput.emit(this.progress);
  }


}

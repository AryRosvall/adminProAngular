import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncrementBarComponent } from './increment-bar/increment-bar.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [IncrementBarComponent, DoughnutComponent],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ],
  exports: [
    IncrementBarComponent,
    DoughnutComponent
  ]
})
export class ComponentsModule { }

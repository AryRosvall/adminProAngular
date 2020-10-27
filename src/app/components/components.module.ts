import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IncrementBarComponent } from './increment-bar/increment-bar.component';



@NgModule({
  declarations: [IncrementBarComponent],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    IncrementBarComponent
  ]
})
export class ComponentsModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SummaryComponent } from './summary.component';
import { NbCardModule } from '@nebular/theme';



@NgModule({
  declarations: [SummaryComponent],
  imports: [
    CommonModule,
    NbCardModule,
  ]
})
export class SummaryModule { }

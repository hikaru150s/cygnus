import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MetricsComponent } from './metrics.component';
import {
  NbCardModule,
  NbTabsetModule,
  NbTreeGridModule,
  NbSpinnerModule,
} from '@nebular/theme';



@NgModule({
  declarations: [MetricsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbTabsetModule,
    NbTreeGridModule,
    NbSpinnerModule,
  ]
})
export class MetricsModule { }

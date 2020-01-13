import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvalComponent } from './eval.component';
import { NbCardModule, NbListModule } from '@nebular/theme';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [EvalComponent],
  imports: [
    CommonModule,
    RouterModule,
    NbCardModule,
    NbListModule,
  ]
})
export class EvalModule { }

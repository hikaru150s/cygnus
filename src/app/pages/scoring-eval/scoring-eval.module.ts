import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoringEvalComponent } from './scoring-eval.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [ScoringEvalComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
  ]
})
export class ScoringEvalModule { }

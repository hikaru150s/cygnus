import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoringStudentsComponent } from './scoring-students.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [ScoringStudentsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
  ]
})
export class ScoringStudentsModule { }

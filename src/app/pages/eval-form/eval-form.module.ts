import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvalFormComponent } from './eval-form.component';
import { NbCardModule, NbListModule, NbIconModule } from '@nebular/theme';
import { QuestionFormComponent } from 'src/app/@theme/components';



@NgModule({
  entryComponents: [QuestionFormComponent],
  declarations: [EvalFormComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbListModule,
    NbIconModule,
  ]
})
export class EvalFormModule { }

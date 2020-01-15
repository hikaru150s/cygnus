import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConstraintsComponent } from './constraints.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [ConstraintsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
  ]
})
export class ConstraintsModule { }

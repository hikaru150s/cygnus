import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FqLogComponent } from './fq-log.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [FqLogComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
  ]
})
export class FqLogModule { }

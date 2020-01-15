import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GsqLogComponent } from './gsq-log.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [GsqLogComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
  ]
})
export class GsqLogModule { }

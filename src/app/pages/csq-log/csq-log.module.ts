import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CsqLogComponent } from './csq-log.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [CsqLogComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
  ]
})
export class CsqLogModule { }

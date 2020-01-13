import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './card.component';
import { NbCardModule, NbTabsetModule } from '@nebular/theme';
import { NgxChartsModule } from '@swimlane/ngx-charts';


@NgModule({
  declarations: [CardComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbTabsetModule,
    NgxChartsModule,
  ],
  exports: [CardComponent],
})
export class CardModule { }

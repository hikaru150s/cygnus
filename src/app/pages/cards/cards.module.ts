import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardsComponent } from './cards.component';
import { CardModule } from '../card/card.module';
import { NbCardModule, NbSelectModule } from '@nebular/theme';



@NgModule({
  declarations: [CardsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    NbSelectModule,
    CardModule,
  ]
})
export class CardsModule { }

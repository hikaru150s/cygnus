import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScoringGroupsComponent } from './scoring-groups.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';


@NgModule({
  declarations: [ScoringGroupsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
  ]
})
export class ScoringGroupsModule { }

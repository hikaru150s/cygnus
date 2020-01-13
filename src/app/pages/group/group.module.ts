import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { NbCardModule } from '@nebular/theme';


@NgModule({
  declarations: [GroupComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
  ]
})
export class GroupModule { }

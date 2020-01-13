import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignmentsStudentsComponent } from './assignments-students.component';
import { NbCardModule } from '@nebular/theme';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import {
  DateEditorComponent,
  DateRenderComponent,
  DateFilterComponent,
} from 'src/app/@theme/components';


@NgModule({
  entryComponents: [
    DateEditorComponent,
    DateRenderComponent,
    DateFilterComponent,
  ],
  declarations: [AssignmentsStudentsComponent],
  imports: [
    CommonModule,
    NbCardModule,
    Ng2SmartTableModule,
  ]
})
export class AssignmentsStudentsModule { }

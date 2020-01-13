import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import {
  NbAlertModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbSelectModule,
} from '@nebular/theme';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSelectModule,
  ]
})
export class RegisterModule { }

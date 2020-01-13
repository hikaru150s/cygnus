import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import {
  NbAlertModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
} from '@nebular/theme';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LoginComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
  ]
})
export class LoginModule { }

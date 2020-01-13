import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { LoginModule } from './login/login.module';
import { RegisterModule } from './register/register.module';
import { NbAuthModule } from '@nebular/auth';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  NbAlertModule,
  NbInputModule,
  NbButtonModule,
  NbCheckboxModule,
  NbSelectModule,
  NbWindowModule,
} from '@nebular/theme';


@NgModule({
  declarations: [AuthComponent],
  imports: [
    CommonModule,
    NbAuthModule,
    AuthRoutingModule,
    LoginModule,
    RegisterModule,
    FormsModule,
    RouterModule,
    NbAlertModule,
    NbInputModule,
    NbButtonModule,
    NbCheckboxModule,
    NbSelectModule,
    NbWindowModule.forChild(),
  ]
})
export class AuthModule { }

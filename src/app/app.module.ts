import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './@core/core.module';
import { ThemeModule } from './@theme/theme.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbDatepickerModule,
  NbDialogModule,
  NbMenuModule,
  NbSidebarModule,
  NbToastrModule,
  NbWindowModule,
} from '@nebular/theme';
import { NbAuthModule, NbPasswordAuthStrategy, NbAuthJWTToken } from '@nebular/auth';
import { AuthGuardService } from './@core/utils/auth-guard.service';
import { BaseInterceptorService } from './@core/utils/base-interceptor.service';
import { QuestionFormComponent } from './@theme/components';


@NgModule({
  entryComponents: [QuestionFormComponent],
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,

    ThemeModule.forRoot(),

    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbDatepickerModule.forRoot(),
    NbDialogModule.forRoot(),
    NbWindowModule.forRoot(),
    NbToastrModule.forRoot(),
    CoreModule.forRoot(),

    NbEvaIconsModule,

    NbAuthModule.forRoot({
      strategies: [
        NbPasswordAuthStrategy.setup({
          name: 'email',
          baseEndpoint: 'http://127.0.0.1:8000/api/',
          token: {
            class: NbAuthJWTToken,
            key: 'token',
          },
          login: {
            endpoint: 'login',
            method: 'post',
            redirect: {
              success: '/pages/dashboard',
              failure: null,
            },
          },
          register: {
            endpoint: 'user',
            method: 'post',
            redirect: {
              success: '/auth/login',
              failure: null,
            },
          },
          logout: {
            endpoint: 'logout',
            method: 'delete',
            redirect: {
              success: '/auth/login',
              failure: null,
            },
          },
        }),
      ],
      forms: {
        login: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        },
        register: {
          redirectDelay: 0,
          showMessages: {
            success: true,
          },
        }, },
    }),
  ],
  providers: [
    AuthGuardService,
    { provide: HTTP_INTERCEPTORS, useClass: BaseInterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

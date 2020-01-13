import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found.component';
import { ThemeModule } from 'src/app/@theme/theme.module';
import { NbCardModule, NbButtonModule } from '@nebular/theme';



@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    ThemeModule,
    NbCardModule,
    NbButtonModule,
    CommonModule
  ]
})
export class NotFoundModule { }

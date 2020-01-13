import {
  Component,
  OnInit,
  Inject,
  ChangeDetectorRef,
  ViewChild,
  TemplateRef,
} from '@angular/core';
import {
  NbRegisterComponent,
  NbAuthService,
  NB_AUTH_OPTIONS,
} from '@nebular/auth';
import { Router } from '@angular/router';
import { NbWindowService } from '@nebular/theme';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends NbRegisterComponent implements OnInit {
  @ViewChild('contentTemplate', { static: false }) contentTemplate: TemplateRef<any>;

  constructor(
    protected service: NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd: ChangeDetectorRef,
    protected router: Router,
    private windowService: NbWindowService,
  ) {
      super(service, options, cd, router);
  }

  roleSelection = [
    {
      title: 'Student',
      value: 'STUDENT',
    },
    {
      title: 'Teacher',
      value: 'TEACHER',
    },
  ];

  ngOnInit() {
    this.user.role = 'STUDENT';
  }

  openTOS() {
    this.windowService.open(this.contentTemplate, {
      title: 'Terms & Conditions',
    });
  }
}

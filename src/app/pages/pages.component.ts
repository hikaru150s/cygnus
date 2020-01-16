import { Component } from '@angular/core';

import { MENU_ITEMS } from './pages-menu';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { NbMenuItem } from '@nebular/theme';

@Component({
  selector: 'ngx-pages',
  styleUrls: ['pages.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})
export class PagesComponent {

  menu = MENU_ITEMS;
  students: NbMenuItem[] = [
    {
      title: 'Student',
      group: true,
    },
    {
      title: 'My Group',
      icon: 'people-outline',
      link: '/pages/group',
    },
    {
      title: 'Group Evaluation',
      icon: 'file-text-outline',
      link: '/pages/eval',
    },
    {
      title: 'My Card',
      icon: 'bar-chart-outline',
      link: '/pages/card',
    },
  ];
  teachers: NbMenuItem[] = [
    {
      title: 'Teacher',
      group: true,
    },
    {
      title: 'My Students',
      icon: 'person-outline',
      link: '/pages/students',
    },
    {
      title: 'Students Group',
      icon: 'people-outline',
      link: '/pages/groups',
    },
    {
      title: 'Assignments',
      icon: 'list-outline',
      children: [
        {
          title: 'Individual',
          link: '/pages/assignments/students'
        },
        {
          title: 'Group',
          link: '/pages/assignments/groups'
        },
        {
          title: 'Group Evaluation',
          link: '/pages/assignments/eval'
        },
      ],
    },
    {
      title: 'Scoring',
      icon: 'edit-outline',
      children: [
        {
          title: 'Individual',
          link: '/pages/scoring/students'
        },
        {
          title: 'Group',
          link: '/pages/scoring/groups'
        },
        {
          title: 'Group Evaluation',
          link: '/pages/scoring/eval'
        },
      ],
    },
    {
      title: 'Student Cards',
      icon: 'bar-chart-outline',
      link: '/pages/cards',
    },
    {
      title: 'Summary',
      icon: 'trending-up-outline',
      link: '/pages/summary',
    },
    {
      title: 'Satisfactions',
      icon: 'checkmark-circle-outline',
      children: [
        {
          title: 'Goals',
          link: '/pages/goals'
        },
        {
          title: 'Constraints',
          link: '/pages/constaints'
        },
        {
          title: 'Constraints Satisfaction Quality',
          link: '/pages/csq'
        },
        {
          title: 'Formation Quality',
          link: '/pages/fq'
        },
        {
          title: 'Goal Satisfaction Quality',
          link: '/pages/gsq'
        },
        {
          title: 'Metrics',
          link: '/pages/metrics'
        },
      ],
    },
  ];

  public constructor(private auteService: NbAuthService) {
    this.auteService.getToken().subscribe((token: NbAuthJWTToken) => {
      if (token.getPayload().role === 'TEACHER') {
        this.menu = [...MENU_ITEMS, ...this.teachers];
      } else {
        this.menu = [...MENU_ITEMS, ...this.students];
      }
    });
  }
}

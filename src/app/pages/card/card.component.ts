import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { Subscription } from 'rxjs';
import { ICardDataset } from 'src/app/@core/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit, OnChanges, OnDestroy {
  @Input() userId: number = null;
  userName = null;
  dataset: ICardDataset = null;
  colorScheme: any;
  themeSubscription: Subscription;
  loaded = false;
  // chart: {
  //  user: IChartGroupData[];
  //  group: IChartData[];
  //  evaluation: any[];
  // } = {
  //    user: null,
  //    group: null,
  //    evaluation: null,
  //  };

  constructor(
    private theme: NbThemeService,
    private client: HttpClient,
    private authService: NbAuthService,
  ) {
    this.themeSubscription = this.theme.getJsTheme().subscribe(config => {
      const colors = config.variables;
      this.colorScheme = {
        domain: [colors.primaryLight, colors.successLight, colors.infoLight, colors.warningLight, colors.dangerLight],
      };
    });
  }

  ngOnInit() {
    if (this.userId === null) {
      this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
        this.userId = token.getPayload().sub;
        this.userName = token.getPayload().name;
        this.loadData();
      });
    } else {
      this.loadData();
    }
  }

  loadData() {
    if (!this.loaded) {
      const urlTarget = new URL(`/api/card/${this.userId}`, env.server);
      this.client.get<ICardDataset>(urlTarget.href).subscribe(d => {
        this.dataset = d;
        this.loaded = true;
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.userId) {
      this.userId = changes.userId.currentValue;
      if (this.userId !== undefined && this.userId !== null) {
        this.loadData();
      }
      // this.dataset = {
      //  user: [
      //    {
      //      id: 0,
      //      reviewerId: 1,
      //      targetId: this.userId,
      //      target: this.userName,
      //      subjectId: 0,
      //      subject: 'Test 0',
      //      session: 'PRE',
      //      value: Math.random() * 100,
      //      created_at: Date.now(),
      //    },
      //    {
      //      id: 1,
      //      reviewerId: 1,
      //      targetId: this.userId,
      //      target: this.userName,
      //      subjectId: 0,
      //      subject: 'Test 0',
      //      session: 'POST',
      //      value: Math.random() * 100,
      //      created_at: Date.now(),
      //    },
      //    {
      //      id: 2,
      //      reviewerId: 1,
      //      targetId: this.userId,
      //      target: this.userName,
      //      subjectId: 1,
      //      subject: 'Test 1',
      //      session: 'PRE',
      //      value: Math.random() * 100,
      //      created_at: Date.now(),
      //    },
      //    {
      //      id: 3,
      //      reviewerId: 1,
      //      targetId: this.userId,
      //      target: this.userName,
      //      subjectId: 1,
      //      subject: 'Test 1',
      //      session: 'POST',
      //      value: Math.random() * 100,
      //      created_at: Date.now(),
      //    },
      //    {
      //      id: 4,
      //      reviewerId: 1,
      //      targetId: this.userId,
      //      target: this.userName,
      //      subjectId: 2,
      //      subject: 'Test 2',
      //      session: 'PRE',
      //      value: Math.random() * 100,
      //      created_at: Date.now(),
      //    },
      //    {
      //      id: 5,
      //      reviewerId: 1,
      //      targetId: this.userId,
      //      target: this.userName,
      //      subjectId: 2,
      //      subject: 'Test 2',
      //      session: 'POST',
      //      value: Math.random() * 100,
      //      created_at: Date.now(),
      //    },
      //  ],
      //  group: [
      //    {
      //      id: 0,
      //      reviewerId: 1,
      //      targetId: this.userId,
      //      target: this.userName,
      //      subjectId: 0,
      //      subject: 'Group Test 0',
      //      value: Math.random() * 100,
      //      created_at: Date.now(),
      //    },
      //    {
      //      id: 2,
      //      reviewerId: 1,
      //      targetId: this.userId,
      //      target: this.userName,
      //      subjectId: 1,
      //      subject: 'Group Test 1',
      //      value: Math.random() * 100,
      //      created_at: Date.now(),
      //    },
      //    {
      //      id: 4,
      //      reviewerId: 1,
      //      targetId: this.userId,
      //      target: this.userName,
      //      subjectId: 2,
      //      subject: 'Group Test 2',
      //      value: Math.random() * 100,
      //      created_at: Date.now(),
      //    },
      //  ],
      //  evaluation: [...new Array(198).keys()].map(i => ({
      //    id: i,
      //    reviewerId: i % 3,
      //    targetId: this.userId,
      //    target: this.userName,
      //    subjectId: i % 2,
      //    subject: `Subject ${i % 2}`,
      //    questionId: i % 99,
      //    question: `Question ${i % 99}`,
      //    value: 1 + Math.floor(Math.random() * 4),
      //    created_at: Date.now(),
      //  })),
      // };
      // this.chart.user = this.dataset.user.map(v => v.subjectId).filter((v, i, a) => a.indexOf(v) === i).map(sub => {
      //  let d = this.dataset.user.filter(v => v.subjectId === sub);
      //  return {
      //    name: d[0].subject,
      //    series: d.sort((a, b) => a.session === 'POST' && b.session === 'PRE' ? 1 : (a.session === 'PRE' && b.session === 'POST' ? -1 : 0)).map(v => ({ name: `${v.subject} ${v.session.toLowerCase()}test`, value: v.value })),
      //  };
      // });
      // this.chart.group = this.dataset.group.map(v => ({
      //  name: v.subject,
      //  value: v.value,
      // }));
      // this.chart.evaluation = this.dataset.evaluation.map(v => v.subjectId).filter((v, i, a) => a.indexOf(v) === i).map(sub => {
      //  let d = this.dataset.evaluation.filter(v => v.subjectId === sub);
      //  return {
      //    name: d[0].subject,
      //    series: [
      //      {
      //        name: 'Sharing resources/ideas',
      //        value: d.filter(v => v.questionId >= 0 && v.questionId < 3).map(v => v.value).reduce((p, c) => p + c) / d.filter(v => v.questionId >= 0 && v.questionId < 3).length,
      //      },
      //      {
      //        name: 'Negotiating ideas',
      //        value: d.filter(v => v.questionId >= 3 && v.questionId < 13).map(v => v.value).reduce((p, c) => p + c) / d.filter(v => v.questionId >= 3 && v.questionId < 13).length,
      //      },
      //      {
      //        name: 'Regulating problem solving activities',
      //        value: d.filter(v => v.questionId >= 13 && v.questionId < 23).map(v => v.value).reduce((p, c) => p + c) / d.filter(v => v.questionId >= 13 && v.questionId < 23).length,
      //      },
      //      {
      //        name: 'Maintaining positive communications',
      //        value: d.filter(v => v.questionId >= 23 && v.questionId < 33).map(v => v.value).reduce((p, c) => p + c) / d.filter(v => v.questionId >= 23 && v.questionId < 33).length,
      //      },
      //    ],
      //    avg: d.map(v => v.value).reduce((p, c) => p + c) / d.length
      //  };
      // });

    }
  }

  ngOnDestroy() {
    this.themeSubscription.unsubscribe();
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NbWindowService } from '@nebular/theme';
import { QuestionFormComponent } from 'src/app/@theme/components';
import { HttpClient } from '@angular/common/http';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { IEvaluationNamePair, IQuestion } from 'src/app/@core/interfaces';
import { environment as env } from 'src/environments/environment';
import { DataSourceService } from '../../@core/utils/data-source.service';

@Component({
  selector: 'app-eval-form',
  templateUrl: './eval-form.component.html',
  styleUrls: ['./eval-form.component.scss']
})
export class EvalFormComponent implements OnInit {
  evalId: number = null;
  userList: { id: number; name: string; status: boolean; }[] = [];
  reviewerId: number;
  questionList: IQuestion[] = [];

  constructor(
    private route: ActivatedRoute,
    private windowService: NbWindowService,
    private authService: NbAuthService,
    private client: HttpClient,
    private ds: DataSourceService,
  ) { }

  reload() {
    const urlTarget = new URL(`/api/form/${this.reviewerId}/eval/${this.evalId}`, env.server);
    this.ds.getAll<IQuestion>('/api/question?_limit=100').subscribe(question => {
      this.questionList = question;
      this.client.get<IEvaluationNamePair[]>(urlTarget.href).subscribe(r => {
        this.userList = r.map(v => ({ id: v.id, name: v.name, status: v.status }));
      });
    });
  }

  ngOnInit() {
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      this.reviewerId = token.getPayload().sub;
      this.route.paramMap.subscribe(params => {
        this.evalId = parseInt(params.get('id'), 10);
        this.reload();
      });
    });
  }

  take(targetId: number, targetName: string) {
    const w = this.windowService.open(QuestionFormComponent, {
      title: `Evaluating ${targetName}`,
      context: {
        reviewerId: this.reviewerId,
        targetId,
        evalId: this.evalId,
        questionList: this.questionList,
      },
    });
    w.onClose.subscribe(data => {
      console.log(`Evaluating ${targetName}:`, data);
      this.reload();
    });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { EventEmitter } from 'events';
import { IQuestion, IEvaluationLog } from 'src/app/@core/interfaces';
import { DataSourceService } from 'src/app/@core/utils/data-source.service';
import { forkJoin } from 'rxjs';
import { NbWindowRef } from '@nebular/theme';
import * as moment from 'moment';

@Component({
  selector: 'app-question-form',
  styleUrls: ['./question-form.component.scss'],
  templateUrl: './question-form.component.html',
})
export class QuestionFormComponent implements OnInit {
  @Input() reviewerId: number;
  @Input() targetId: number;
  @Input() evalId: number;
  @Input() questionList: IQuestion[] = [];
  logs: IEvaluationLog[] = [];

  constructor(protected windowRef: NbWindowRef, private ds: DataSourceService) { }

  ngOnInit() {
    //console.log('Question form init:', this);
    //this.ds.getAll<IQuestion>('/api/question').subscribe(r => {
    //  this.questionList = r;
    //});
  }

  getValue(questionId: number) {
    const needle = this.logs.find(v => v.question === questionId);
    return needle ? needle.value : null;
  }

  setValue(questionId: number, value: any) {
    const needle = this.logs.findIndex(v => v.question === questionId);
    if (needle >= 0) {
      this.logs[needle].value = value;
    } else {
      this.logs.push({
        created_at: new Date(),
        question: questionId,
        reviewer: this.reviewerId,
        subject: this.evalId,
        target: this.targetId,
        value,
      });
    }
  }

  nextClicked(isLast: boolean, event: EventEmitter) {
    if (isLast) {
      forkJoin(this.logs.map(r => {
        r.created_at = moment(r.created_at).format('YYYY-MM-DD HH:mm:ss');
        return this.ds.add<IEvaluationLog, IEvaluationLog>('/api/eval_log', r);
      })).subscribe(result => {
        this.logs = result;
        this.windowRef.close();
      });
    }
  }
}
import { Component, OnInit } from '@angular/core';
import { DataSourceService } from 'src/app/@core/utils/data-source.service';
import { IEvaluation } from 'src/app/@core/interfaces';

@Component({
  selector: 'app-eval',
  templateUrl: './eval.component.html',
  styleUrls: ['./eval.component.scss']
})
export class EvalComponent implements OnInit {
  evalList: { id: string; name: string; }[] = [];

  constructor(private ds: DataSourceService) { }

  ngOnInit() {
    this.ds.getAll<IEvaluation>('/api/eval').subscribe(ev => {
      this.evalList = ev.map(v => ({ id: v.id, name: v.name }));
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { DataSourceService } from 'src/app/@core/utils/data-source.service';
import { } from 'src/app/@core/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { DateRenderComponent } from 'src/app/@theme/components';
import * as moment from 'moment';

@Component({
  selector: 'app-scoring-eval',
  templateUrl: './scoring-eval.component.html',
  styleUrls: ['./scoring-eval.component.scss']
})
export class ScoringEvalComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: false,
    },
    actions: {
      add: false,
      edit: false,
      delete: false,
      position: 'right',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'text',
        editable: false,
      },
      reviewer: {
        title: 'Reviewer',
        type: 'text',
        editable: false,
      },
      target: {
        title: 'Target',
        type: 'text',
      },
      subject: {
        title: 'Subject',
        type: 'text',
      },
      question: {
        title: 'Question',
        type: 'text',
      },
      value: {
        title: 'Value',
        type: 'text',
      },
      created_at: {
        title: 'Timestamp',
        type: 'custom',
        renderComponent: DateRenderComponent,
        valuePrepareFunction: (cell: string, _row: any) => moment(cell).toDate(),
        editable: false,
      },
    },
  };

  source: ServerDataSource = new ServerDataSource(this.client, { endPoint: `${env.server}/api/eval_log` });

  constructor(private client: HttpClient) {
    // this.source.load([...new Array(50).keys()].map(v => ({ id: v, name: `Group ${v}`, start: Date.now() })));
  }

  ngOnInit() {
  }

}

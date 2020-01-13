import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import {
  DateEditorComponent,
  DateRenderComponent,
  DateFilterComponent,
} from 'src/app/@theme/components';
import {
  ISmartTableCreateConfirmEvent,
  IEvaluation, ISmartTableEditConfirmEvent,
  ISmartTableDeleteConfirmEvent,
} from 'src/app/@core/interfaces';
import { DataSourceService } from 'src/app/@core/utils/data-source.service';
import * as moment from 'moment';

@Component({
  selector: 'app-assignments-eval',
  templateUrl: './assignments-eval.component.html',
  styleUrls: ['./assignments-eval.component.scss']
})
export class AssignmentsEvalComponent implements OnInit {

  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true,
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    actions: {
      position: 'right',
    },
    columns: {
      id: {
        title: 'ID',
        type: 'text',
        editable: false,
      },
      name: {
        title: 'Name',
        type: 'text',
      },
      start: {
        title: 'Start Date',
        type: 'custom',
        renderComponent: DateRenderComponent,
        valuePrepareFunction: (cell: string, _row: any) => moment(cell).toDate(),
        editor: {
          type: 'custom',
          component: DateEditorComponent,
        },
        filter: {
          type: 'custom',
          component: DateFilterComponent,
        },
        filterFunction: (value: string, search: string) => {
          const parsed = search.split('-');
          const now = new Date(value);
          const low = new Date(parseInt(parsed[0], 10));
          const high = new Date(parseInt(parsed[1], 10));
          high.setHours(23, 59, 59, 999);
          return low <= now && high >= now;
        },
      },
    },
  };

  source: ServerDataSource = new ServerDataSource(this.client, { endPoint: `${env.server}/api/eval` });

  constructor(private client: HttpClient, private ds: DataSourceService) {
    // this.source.load([...new Array(50).keys()].map(v => ({ id: v, name: `Group ${v}`, start: Date.now() })));
  }

  ngOnInit() {
  }

  onAdd(e: ISmartTableCreateConfirmEvent<IEvaluation>) {
    this.ds.add<IEvaluation, IEvaluation>('/api/eval', e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onEdit(e: ISmartTableEditConfirmEvent<IEvaluation>) {
    this.ds.edit<IEvaluation, IEvaluation>('/api/eval', e.data.id, e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onDelete(e: ISmartTableDeleteConfirmEvent<IEvaluation>) {
    this.ds.delete<IEvaluation>('/api/eval', e.data.id).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { DateEditorComponent, DateRenderComponent, DateFilterComponent } from 'src/app/@theme/components';
import { DataSourceService } from 'src/app/@core/utils/data-source.service';
import { ISmartTableCreateConfirmEvent, ISmartTableEditConfirmEvent, ISmartTableDeleteConfirmEvent, IUserScoring } from 'src/app/@core/interfaces';
import * as moment from 'moment';
import { stringIdComparer } from '../../@core/utils';


@Component({
  selector: 'app-assignments-students',
  templateUrl: './assignments-students.component.html',
  styleUrls: ['./assignments-students.component.scss']
})
export class AssignmentsStudentsComponent implements OnInit {
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
        compareFunction: stringIdComparer,
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

  source: ServerDataSource = new ServerDataSource(this.client, { endPoint: `${env.server}/api/user_scoring` });

  constructor(private client: HttpClient, private ds: DataSourceService) {
    // this.source.load([...new Array(50).keys()].map(v => ({ id: v, name: `Group ${v}`, start: Date.now() })));
  }

  ngOnInit() {
  }

  onAdd(e: ISmartTableCreateConfirmEvent<IUserScoring>) {
    this.ds.add<IUserScoring, IUserScoring>('/api/user_scoring', e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onEdit(e: ISmartTableEditConfirmEvent<IUserScoring>) {
    this.ds.edit<IUserScoring, IUserScoring>('/api/user_scoring', e.data.id, e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onDelete(e: ISmartTableDeleteConfirmEvent<IUserScoring>) {
    this.ds.delete<IUserScoring>('/api/user_scoring', e.data.id).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }
}

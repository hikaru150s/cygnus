import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { DataSourceService } from 'src/app/@core/utils/data-source.service';
import {
  IListPair,
  ISmartTableCreateConfirmEvent,
  ISmartTableEditConfirmEvent,
  ISmartTableDeleteConfirmEvent,
  IGroup,
  IConstraint,
  IGoal,
  ICsqLog,
} from 'src/app/@core/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { DateRenderComponent } from 'src/app/@theme/components';
import * as moment from 'moment';
import { stringIdComparer } from '../../@core/utils';

@Component({
  selector: 'app-csq-log',
  templateUrl: './csq-log.component.html',
  styleUrls: ['./csq-log.component.scss']
})
export class CsqLogComponent implements OnInit {
  targetList: IListPair[] = [];
  constraintList: IListPair[] = [];
  goalList: IListPair[] = [];

  settings = null;

  source: ServerDataSource = new ServerDataSource(this.client, { endPoint: `${env.server}/api/csq/log` });

  constructor(private client: HttpClient, private ds: DataSourceService) {
    // this.source.load([...new Array(50).keys()].map(v => ({ id: v, name: `Group ${v}`, start: Date.now() })));
  }

  ngOnInit() {
    this.ds.getAll<IGroup>('/api/group?_limit=100000').subscribe(g => {
      this.ds.getAll<IConstraint>('/api/constraint?_limit=100000').subscribe(c => {
        this.ds.getAll<IGoal>('/api/goal?_limit=100000').subscribe(l => {
          this.targetList = g.map(v => ({ title: v.name, value: v.id }));
          this.constraintList = c.map(v => ({ title: v.name, value: v.id }));
          this.goalList = l.map(v => ({ title: v.name, value: v.id }));
          this.settings = {
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
              reviewer: {
                title: 'Reviewer',
                type: 'text',
                editable: false,
                compareFunction: stringIdComparer,
              },
              goalId: {
                title: 'Goal',
                type: 'text',
                editor: {
                  type: 'list',
                  config: {
                    list: this.goalList,
                  },
                },
              },
              constraintId: {
                title: 'Constraint',
                type: 'text',
                editor: {
                  type: 'list',
                  config: {
                    list: this.constraintList,
                  },
                },
              },
              targetId: {
                title: 'Target',
                type: 'text',
                editor: {
                  type: 'list',
                  config: {
                    list: this.targetList,
                  },
                },
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
        });
      });
    });
  }

  onAdd(e: ISmartTableCreateConfirmEvent<ICsqLog>) {
    e.newData.value = parseInt(e.newData.value.toString(), 10);
    this.ds.add<ICsqLog, ICsqLog>('/api/csq/log', e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onEdit(e: ISmartTableEditConfirmEvent<ICsqLog>) {
    e.newData.value = parseInt(e.newData.value.toString(), 10);
    this.ds.edit<ICsqLog, ICsqLog>('/api/csq/log', e.data.id, e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onDelete(e: ISmartTableDeleteConfirmEvent<ICsqLog>) {
    this.ds.delete<ICsqLog>('/api/csq/log', e.data.id).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }
}

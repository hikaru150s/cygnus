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
  IFqLog,
} from 'src/app/@core/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { DateRenderComponent } from 'src/app/@theme/components';
import * as moment from 'moment';
import { stringIdComparer } from '../../@core/utils';

@Component({
  selector: 'app-fq-log',
  templateUrl: './fq-log.component.html',
  styleUrls: ['./fq-log.component.scss']
})
export class FqLogComponent implements OnInit {
  targetList: IListPair[] = [];
  constraintList: IListPair[] = [];
  goalList: IListPair[] = [];

  settings = null;

  source: ServerDataSource = new ServerDataSource(this.client, { endPoint: `${env.server}/api/fq/log` });

  constructor(private client: HttpClient, private ds: DataSourceService) {
    // this.source.load([...new Array(50).keys()].map(v => ({ id: v, name: `Group ${v}`, start: Date.now() })));
  }

  ngOnInit() {
    this.ds.getAll<IGroup>('/api/group').subscribe(g => {
      this.ds.getAll<IConstraint>('/api/constraint').subscribe(c => {
        this.ds.getAll<IGoal>('/api/goal').subscribe(l => {
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

  onAdd(e: ISmartTableCreateConfirmEvent<IFqLog>) {
    e.newData.value = parseInt(e.newData.value.toString(), 10);
    this.ds.add<IFqLog, IFqLog>('/api/fq/log', e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onEdit(e: ISmartTableEditConfirmEvent<IFqLog>) {
    e.newData.value = parseInt(e.newData.value.toString(), 10);
    this.ds.edit<IFqLog, IFqLog>('/api/fq/log', e.data.id, e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onDelete(e: ISmartTableDeleteConfirmEvent<IFqLog>) {
    this.ds.delete<IFqLog>('/api/fq/log', e.data.id).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }
}

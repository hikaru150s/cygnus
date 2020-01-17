import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { DataSourceService } from 'src/app/@core/utils/data-source.service';
import {
  IListPair,
  IGroup,
  IGroupScoring,
  ISmartTableCreateConfirmEvent,
  ISmartTableEditConfirmEvent,
  ISmartTableDeleteConfirmEvent,
  IGroupScoringLog,
} from 'src/app/@core/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { DateRenderComponent } from 'src/app/@theme/components';
import * as moment from 'moment';
import { stringIdComparer } from '../../@core/utils';

@Component({
  selector: 'app-scoring-groups',
  templateUrl: './scoring-groups.component.html',
  styleUrls: ['./scoring-groups.component.scss']
})
export class ScoringGroupsComponent implements OnInit {
  targetList: IListPair[] = [];
  subjectList: IListPair[] = [];

  settings = null;

  source: ServerDataSource = new ServerDataSource(this.client, { endPoint: `${env.server}/api/group_scoring_log` });

  constructor(private client: HttpClient, private ds: DataSourceService) {
    // this.source.load([...new Array(50).keys()].map(v => ({ id: v, name: `Group ${v}`, start: Date.now() })));
  }

  ngOnInit() {
    this.ds.getAll<IGroup>('/api/group').subscribe(g => {
      this.ds.getAll<IGroupScoring>('/api/group_scoring').subscribe(s => {
        this.targetList = g.map(v => ({ title: v.name, value: v.id }));
        this.subjectList = s.map(v => ({ title: v.name, value: v.id }));
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
            subjectId: {
              title: 'Subject',
              type: 'text',
              editor: {
                type: 'list',
                config: {
                  list: this.subjectList,
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
  }

  onAdd(e: ISmartTableCreateConfirmEvent<IGroupScoringLog>) {
    e.newData.value = parseInt(e.newData.value.toString(), 10);
    this.ds.add<IGroupScoringLog, IGroupScoringLog>('/api/group_scoring_log', e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onEdit(e: ISmartTableEditConfirmEvent<IGroupScoringLog>) {
    e.newData.value = parseInt(e.newData.value.toString(), 10);
    this.ds.edit<IGroupScoringLog, IGroupScoringLog>('/api/group_scoring_log', e.data.id, e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onDelete(e: ISmartTableDeleteConfirmEvent<IGroupScoringLog>) {
    this.ds.delete<IGroupScoringLog>('/api/group_scoring_log', e.data.id).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }
}

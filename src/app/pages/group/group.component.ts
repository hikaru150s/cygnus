import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { DataSourceService } from 'src/app/@core/utils/data-source.service';
import { ISmartTableCreateConfirmEvent, ISmartTableEditConfirmEvent, ISmartTableDeleteConfirmEvent, IGroup, IStudent } from 'src/app/@core/interfaces';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class GroupComponent implements OnInit {
  groupNum: number = null;
  groupName: string = null;
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false,
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
        editable: false,
      },
      email: {
        title: 'Email',
        type: 'text',
        editable: false,
      },
    },
  };

  source: ServerDataSource;

  constructor(private client: HttpClient, private ds: DataSourceService, private authService: NbAuthService) {
    // this.source.load([...new Array(5).keys()].map(v => ({ id: v, name: `Test ${v}`, email: `${v}@test.com` })));
  }

  ngOnInit() {
    this.authService.getToken().subscribe((token: NbAuthJWTToken) => {
      const userId = token.getPayload().sub;
      this.ds.getAll<IStudent>('/api/student', { filter: { userId } }).subscribe(result => {
        this.groupNum = result[0].groupId;
        this.ds.getOne<IGroup>('/api/group', this.groupNum).subscribe(g => {
          this.groupName = g.name;
          this.source = new ServerDataSource(this.client, { endPoint: `${env.server}/api/group?groupId_like=${this.groupNum}` });
        });
      });
    });
  }

  onAdd(e: ISmartTableCreateConfirmEvent<IGroup>) {
    this.ds.add<IGroup, IGroup>('/api/group', e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onEdit(e: ISmartTableEditConfirmEvent<IGroup>) {
    this.ds.edit<IGroup, IGroup>('/api/group', e.data.id, e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onDelete(e: ISmartTableDeleteConfirmEvent<IGroup>) {
    this.ds.delete<IGroup>('/api/group', e.data.id).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }
}

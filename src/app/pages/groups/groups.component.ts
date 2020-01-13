import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import {
  ISmartTableCreateConfirmEvent,
  ISmartTableEditConfirmEvent,
  ISmartTableDeleteConfirmEvent,
  IGroup,
} from 'src/app/@core/interfaces';
import { DataSourceService } from 'src/app/@core/utils/data-source.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss']
})
export class GroupsComponent implements OnInit {
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
    },
  };

  source: ServerDataSource = new ServerDataSource(this.client, { endPoint: `${env.server}/api/group` });

  constructor(private client: HttpClient, private ds: DataSourceService) {
    // this.source.load([...new Array(50).keys()].map(v => ({ id: v, name: `Group ${v}` })));
  }

  ngOnInit() {
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

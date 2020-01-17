import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { ISmartTableDeleteConfirmEvent, ISmartTableEditConfirmEvent, ISmartTableCreateConfirmEvent, IConstraint } from '../../@core/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import { DataSourceService } from '../../@core/utils/data-source.service';
import { stringIdComparer } from '../../@core/utils';

@Component({
  selector: 'app-constraints',
  templateUrl: './constraints.component.html',
  styleUrls: ['./constraints.component.scss']
})
export class ConstraintsComponent implements OnInit {
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
      description: {
        title: 'Description',
        type: 'text',
      },
    },
  };

  source: ServerDataSource = new ServerDataSource(this.client, { endPoint: `${env.server}/api/constraint` });

  constructor(private client: HttpClient, private ds: DataSourceService) {
    // this.source.load([...new Array(50).keys()].map(v => ({ id: v, name: `Group ${v}` })));
  }

  ngOnInit() {
  }

  onAdd(e: ISmartTableCreateConfirmEvent<IConstraint>) {
    this.ds.add<IConstraint, IConstraint>('/api/constraint', e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onEdit(e: ISmartTableEditConfirmEvent<IConstraint>) {
    this.ds.edit<IConstraint, IConstraint>('/api/constraint', e.data.id, e.newData).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }

  onDelete(e: ISmartTableDeleteConfirmEvent<IConstraint>) {
    this.ds.delete<IConstraint>('/api/constraint', e.data.id).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }
}

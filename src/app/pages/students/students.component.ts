import { Component, OnInit } from '@angular/core';
import { ServerDataSource } from 'ng2-smart-table';
import { DataSourceService } from 'src/app/@core/utils/data-source.service';
import { IGroup, IListPair, ISmartTableEditConfirmEvent, ISmartTableCreateConfirmEvent, ISmartTableDeleteConfirmEvent, IStudent } from 'src/app/@core/interfaces';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

interface IStudentCompact {
  groupId?: number;
  active_reflective: number;
  sensing_intuitive: number;
  sequential_global: number;
  visual_verbal: number;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  groupList: IListPair[] = [];

  settings = null;

  source: ServerDataSource = new ServerDataSource(this.client, { endPoint: `${env.server}/api/student` });

  constructor(private client: HttpClient, private ds: DataSourceService) {
  }

  ngOnInit() {
    // this.source.load([...new Array(50).keys()].map(v => ({ id: v, name: `Test ${v}`, email: `${v}@test.com` })));
    // this.source.refresh();
    this.ds.getAll<IGroup>('/api/group').subscribe(data => {
      this.groupList = data.map(v => ({ title: v.name, value: v.id }));
      this.settings = {
        add: {
          addButtonContent: '<i class="nb-plus"></i>',
          createButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
          confirmCreate: false,
        },
        edit: {
          editButtonContent: '<i class="nb-edit"></i>',
          saveButtonContent: '<i class="nb-checkmark"></i>',
          cancelButtonContent: '<i class="nb-close"></i>',
          confirmSave: true,
        },
        delete: {
          deleteButtonContent: '<i class="nb-trash"></i>',
          confirmDelete: false,
        },
        actions: {
          position: 'right',
          add: false,
          edit: true,
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
          groupId: {
            title: 'Group',
            type: 'text',
            editor: {
              type: 'list',
              config: {
                list: this.groupList,
              },
            },
          },
          active_reflective: {
            title: 'Active - Reflective',
            type: 'text',
          },
          sensing_intuitive: {
            title: 'Sensing - Intuitive',
            type: 'text',
          },
          sequential_global: {
            title: 'Sequential - Global',
            type: 'text',
          },
          visual_verbal: {
            title: 'Visual - Verbal',
            type: 'text',
          },
        },
      };
    });
  }

  onEdit(e: ISmartTableEditConfirmEvent<IStudent>) {
    const mapped: IStudentCompact = {
      groupId: parseInt(e.newData.groupId.toString(), 10),
      active_reflective: parseInt(e.newData.active_reflective.toString(), 10),
      sensing_intuitive: parseInt(e.newData.sensing_intuitive.toString(), 10),
      sequential_global: parseInt(e.newData.sequential_global.toString(), 10),
      visual_verbal: parseInt(e.newData.visual_verbal.toString(), 10),
    };
    this.ds.edit<IStudent, IStudentCompact>('/api/student', e.data.id, mapped).subscribe(saved => {
      e.confirm.resolve(saved);
    }, (err) => {
      e.confirm.reject(err);
    });
  }
}

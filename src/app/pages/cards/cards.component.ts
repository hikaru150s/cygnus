import { Component, OnInit } from '@angular/core';
import { DataSourceService } from 'src/app/@core/utils/data-source.service';
import { IStudent } from 'src/app/@core/interfaces';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent implements OnInit {
  currentView: number = null;
  selection: { id: string, name: string }[] = [];

  constructor(private ds: DataSourceService) { }

  ngOnInit() {
    this.ds.getAll<IStudent>('/api/student?_limit=100000').subscribe(students => {
      this.selection = students.map(v => ({ id: v.id, name: v.name }));
    });
  }

}

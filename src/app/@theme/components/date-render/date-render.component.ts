import { Component, OnInit, Input } from '@angular/core';
import { ViewCell } from 'ng2-smart-table';
import * as moment from 'moment';

@Component({
  selector: 'app-date-render',
  template: `
    {{ rendered }}
  `,
  styles: []
})
export class DateRenderComponent implements OnInit, ViewCell {
  rendered: string;

  @Input() value: string | number;
  @Input() rowData: any;

  constructor() { }

  ngOnInit() {
    this.rendered = moment(this.value).toDate().toLocaleDateString();
  }

}

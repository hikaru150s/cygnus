import { Component, AfterViewInit } from '@angular/core';
import { DefaultEditor } from 'ng2-smart-table';
import * as moment from 'moment';

@Component({
  selector: 'app-date-editor',
  templateUrl: './date-editor.component.html',
  styleUrls: ['./date-editor.component.scss']
})
export class DateEditorComponent extends DefaultEditor implements AfterViewInit {
  currentValue: Date;

  constructor() {
    super();
    this.currentValue = new Date();
  }

  ngAfterViewInit() {
    this.currentValue = new Date(this.cell.getValue());
  }

  update(e: Date) {
    this.currentValue = new Date(e);
    this.cell.setValue(moment(this.currentValue).format('YYYY-MM-DD HH:mm:ss'));
  }
}

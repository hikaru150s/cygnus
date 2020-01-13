import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { DefaultFilter } from 'ng2-smart-table';
import { NbCalendarRange } from '@nebular/theme';


@Component({
  selector: 'app-date-filter',
  template: `
    <input nbInput placeholder="Pick Date Range" [nbDatepicker]="rangepicker" [(ngModel)]="filterValue" readonly/>
    <nb-rangepicker #rangepicker (rangeChange)="onFilter($event)"></nb-rangepicker>
  `,
  styles: []
})
export class DateFilterComponent extends DefaultFilter implements OnInit, OnChanges {
  filterValue: NbCalendarRange<Date>;

  constructor() {
    super();
  }

  ngOnInit() {
  }

  onFilter(e: NbCalendarRange<Date>) {
    if (e.end) {
      this.filterValue = e;
      this.query = `${e.start.getTime()}-${e.end.getTime()}`;
      this.setFilter();
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.query) {
      this.query = changes.query.currentValue !== '' ? changes.query.currentValue : null;
      if (this.query) {
        this.filterValue = {
          start: new Date(this.query.split('-').map(v => parseInt(v, 10)).sort((a, b) => a - b)[0]),
          end: new Date(this.query.split('-').map(v => parseInt(v, 10)).sort((a, b) => a - b)[1]),
        };
      }
    }
  }
}

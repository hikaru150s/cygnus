import { Component, OnInit } from '@angular/core';
import {
  ICsqDataMetric,
  IPfsDataMetric,
  IGsqDataMetric,
  IFqDataMetric,
  ICsqGoalStructure,
  ICsqConstraintStructure,
  ICsqMetric,
  IPfsTreeRowStructure,
  IGsqGoalStructure,
  IGsqMetric,
  IFqMetric,
} from '../../@core/interfaces';
import { NbTreeGridDataSource, NbSortDirection, NbSortRequest, NbTreeGridDataSourceBuilder } from '@nebular/theme';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-metrics',
  templateUrl: './metrics.component.html',
  styleUrls: ['./metrics.component.scss']
})
export class MetricsComponent implements OnInit {

  csq: {
    _raw: ICsqDataMetric;
    dataColSpan: number;
    metricColSpan: number;
    goals: ICsqGoalStructure[];
    constraints: string[];
    metrics: ICsqMetric[];
    constraintStruct: ICsqConstraintStructure;
  } = null;
  pfs: {
    _raw: IPfsDataMetric;
    defaultColumns: string[];
    allColumns: string[];
    dataSource: NbTreeGridDataSource<IPfsTreeRowStructure>;
    sortColumn: string;
    sortDirection: NbSortDirection;
  } = null;
  gsq: {
    _raw: IGsqDataMetric;
    goals: IGsqGoalStructure[];
    constraints: string[];
    metrics: IGsqMetric[];
    resultSpan: number;
  } = null;
  fq: {
    _raw: IFqDataMetric;
    goals: IGsqGoalStructure[];
    metrics: IFqMetric[];
    resultSpan: number;
  } = null;

  constructor(
    private client: HttpClient,
    private dsBuilder: NbTreeGridDataSourceBuilder<IPfsTreeRowStructure>
  ) { }

  ngOnInit() {
    this.client.get<ICsqDataMetric>(new URL('/api/csq/metric', env.server).href).subscribe(csqRaw => {
      this.csq = {
        _raw: csqRaw,
        dataColSpan: csqRaw.goalStruct.map(v => v.span).reduce((p, c) => p + c, 0),
        metricColSpan: csqRaw.goalStruct.map(v => v.span).reduce((p, c) => p + c, 0),
        goals: csqRaw.goalStruct,
        constraints: Object.keys(csqRaw.constraintStruct),
        metrics: csqRaw.metric,
        constraintStruct: csqRaw.constraintStruct,
      };
    });
    this.client.get<IFqDataMetric>(new URL('/api/fq/metric', env.server).href).subscribe(fqRaw => {
      this.fq = {
        _raw: fqRaw,
        goals: fqRaw.goalStruct,
        metrics: fqRaw.metric,
        resultSpan: 2 + fqRaw.goalStruct.length,
      };
    });
    this.client.get<IGsqDataMetric>(new URL('/api/gsq/metric', env.server).href).subscribe(gsqRaw => {
      /*
       *  Due to target browser (ES5 to ES2015), flattening array are not yet supported.
       *  Therefore, we had to imply manual flatten polyfill as described below.
       *
       *  .reduce((p, c) => p.concat(c), [])
       *
       *  This polyfill will reduce 1 level deep (from 3-level array to 2-level array), so we
       *  could ONLY use the polyfill only on certain known level.
       */
      let constraints = gsqRaw.metric.map(r => gsqRaw.goalStruct.map(g => Object.keys(r.data[g.name]))).reduce((p, c) => p.concat(c), []).reduce((p, c) => p.concat(c), []);
      this.gsq = {
        _raw: gsqRaw,
        goals: gsqRaw.goalStruct,
        constraints: constraints,
        metrics: gsqRaw.metric,
        resultSpan: gsqRaw.goalStruct.map(v => v.span).reduce((p, c) => p + c, 0) + 2,
      };
    });
    this.client.get<IPfsDataMetric>(new URL('/api/pfs/metric', env.server).href).subscribe(pfsRaw => {
      let columns = [
        'studentId',
        'groupName',
        'studentName',
        'kind',
        'cpValue',
        'cpSatisfaction',
        'groupCohort',
        'groupSatisfaction',
        'groupStdDev',
      ];
      this.pfs = {
        _raw: pfsRaw,
        defaultColumns: columns,
        allColumns: columns,
        dataSource: this.dsBuilder.create(pfsRaw.treeData),
        sortColumn: '',
        sortDirection: NbSortDirection.NONE,
      };
    });
  }

  flatPolyfill(arr: any[]): any[] {
    return arr.reduce((acc, val) => acc.concat(val), []);
  }

  sum(values: number[]): number {
    return values.reduce((p, c) => p + c, 0);
  }

  avg(values: number[]): number {
    return values.length === 0 ? 0 : this.sum(values) / values.length;
  }

  changeSort(sortRequest: NbSortRequest): void {
    this.pfs.dataSource.sort(sortRequest);
    this.pfs.sortColumn = sortRequest.column;
    this.pfs.sortDirection = sortRequest.direction;
  }

  getDirection(column: string): NbSortDirection {
    return (column === this.pfs.sortColumn) ? this.pfs.sortDirection : NbSortDirection.NONE;
  }
}

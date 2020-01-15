import { Component, OnInit } from '@angular/core';
import { DataSourceService } from '../../@core/utils/data-source.service';

interface ISummaryData {
  left: string;
  right: string;
  correlationCoefficient: number;
  significance: number;
  n: number;
}

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {
  source: ISummaryData[] = [];

  constructor(private ds: DataSourceService) { }

  ngOnInit() {
    this.ds.getAll<ISummaryData>('/api/summary').subscribe(result => {
      this.source = result;
    });
  }

  correlationStatus(_coefficient: number, significance: number) {
    const absSig = Math.abs(significance);
    if (absSig <= 0) {
      return 'No Correlation';
    } else if (absSig > 0 && absSig <= 0.25) {
      return 'Weak, ' + (significance < 0 ? 'opposite correlation' : 'direct correlation');
    } else if (absSig > 0.25 && absSig <= 0.5) {
      return 'Good, ' + (significance < 0 ? 'opposite correlation' : 'direct correlation');
    } else if (absSig > 0.5 && absSig <= 0.75) {
      return 'Strong, ' + (significance < 0 ? 'opposite correlation' : 'direct correlation');
    } else if (absSig > 0.75 && absSig < 1) {
      return 'Very strong, ' + (significance < 0 ? 'opposite correlation' : 'direct correlation');
    } else {
      return 'Perfect, ' + (significance < 0 ? 'opposite correlation' : 'direct correlation');
    }
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';
import {
  IQueryParam,
} from '../interfaces';

@Injectable()
export class DataSourceService {

  constructor(private client: HttpClient) { }

  public getAll<T>(endpoint: string, opts: Partial<IQueryParam> = {}) {
    const target = new URL(endpoint, env.server);
    if (opts.sortBy) {
      target.searchParams.append('_sort', opts.sortBy);
    }
    if (opts.sortOrder) {
      target.searchParams.append('_order', opts.sortOrder);
    }
    if (opts.page) {
      target.searchParams.append('_page', opts.page.toString());
    }
    if (opts.limit) {
      target.searchParams.append('_limit', opts.limit.toString());
    }
    if (opts.filter) {
      Object.keys(opts.filter).forEach(k => {
        target.searchParams.append(k + '_like', opts.filter[k].toString());
      });
    }
    return this.client.get<T[]>(target.href);
  }
  public getOne<T>(endpoint: string, key: string | number) {
    const target = new URL(endpoint.endsWith('/') ? endpoint + key.toString() : `${endpoint}/${key}`, env.server);
    return this.client.get<T>(target.href);
  }
  public add<T, O>(endpoint: string, data: O) {
    const target = new URL(endpoint, env.server);
    return this.client.post<T>(target.href, data);
  }
  public edit<T, O>(endpoint: string, key: string | number, data: O) {
    const target = new URL(endpoint.endsWith('/') ? endpoint + key.toString() : `${endpoint}/${key}`, env.server);
    return this.client.put<T>(target.href, data);
  }
  public delete<T>(endpoint: string, key: string | number) {
    const target = new URL(endpoint.endsWith('/') ? endpoint + key.toString() : `${endpoint}/${key}`, env.server);
    return this.client.delete<T>(target.href);
  }
}

import { } from 'ng2-smart-table';
import { DataSource } from 'ng2-smart-table/lib/lib/data-source/data-source';
import { Deferred } from 'q';

interface IBaseTimestamp {
  created_at: string | number | Date;
  updated_at: string | number | Date;
}

export interface IListPair {
  value: string | number;
  title: string;
}

export interface ISmartTableCreateConfirmEvent<T> {
  newData: T;
  source: DataSource;
  confirm: Deferred<T>;
}

export interface ISmartTableEditConfirmEvent<T> {
  data: T;
  newData: T;
  source: DataSource;
  confirm: Deferred<T>;
}

export interface ISmartTableDeleteConfirmEvent<T> {
  data: T;
  source: DataSource;
  confirm: Deferred<T>;
}

export interface IQueryParam {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
  filter: {
    [key: string]: string | number;
  };
}

export interface IUser extends IBaseTimestamp {
  id?: number;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  role: 'STUDENT' | 'TEACHER';
}

export interface IGroup extends IBaseTimestamp {
  id?: number;
  name: string;
}

export interface IStudent extends IUser {
  groupId: number;
  active_reflective: number;
  sensing_intuitive: number;
  sequential_global: number;
  visual_verbal: number;
}

export interface IUserScoring extends IBaseTimestamp {
  id?: number;
  name: string;
  start: string | number | Date;
}

export interface IGroupScoring extends IUserScoring { }

export interface IEvaluation extends IUserScoring { }

export interface IQuestion extends IBaseTimestamp {
  id?: number;
  subject: string;
}

export interface IUserScoringLog {
  id?: number;
  reviewer: number;
  target: number;
  subject: number;
  session: 'PRE' | 'POST';
  value: number;
  created_at: string | number | Date;
}

export interface IGroupScoringLog {
  id?: number;
  reviewer: number;
  target: number;
  subject: number;
  value: number;
  created_at: string | number | Date;
}

export interface IEvaluationLog {
  id?: number;
  reviewer: number;
  target: number;
  subject: number;
  question: number;
  value: number;
  created_at: string | number | Date;
}

export interface IEvaluationNamePair {
  id?: number;
  name: string;
  status: boolean;
}

export interface IChartData {
  name: string;
  value: number;
}

export interface IChartGroupData {
  name: string;
  series: IChartData[];
}

export interface ICardDataset {
  user: IChartGroupData[];
  group: IChartGroupData[];
  evaluation: IChartGroupData[];
  userAverage: number;
  groupData: IChartGroupData[];
  groupAverage: number;
}

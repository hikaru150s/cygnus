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
  id?: string;
  name: string;
  email: string;
  password?: string;
  password_confirmation?: string;
  role: 'STUDENT' | 'TEACHER';
}

export interface IGroup extends IBaseTimestamp {
  id?: string;
  name: string;
}

export interface IStudent extends IUser {
  groupId?: string;
}

export interface IUserScoring extends IBaseTimestamp {
  id?: string;
  name: string;
  start: string | number | Date;
}

export interface IGroupScoring extends IUserScoring { }

export interface IEvaluation extends IUserScoring { }

export interface IQuestion extends IBaseTimestamp {
  id?: string;
  subject: string;
}

export interface IUserScoringLog {
  id?: string;
  reviewer: string;
  targetId: string;
  subjectId: string;
  session: 'PRE' | 'POST';
  value: number;
  created_at: string | number | Date;
}

export interface IGroupScoringLog {
  id?: string;
  reviewer: string;
  targetId: string;
  subjectId: string;
  value: number;
  created_at: string | number | Date;
}

export interface IEvaluationLog {
  id?: string;
  reviewer: string;
  targetId: string;
  subjectId: string;
  questionId: string;
  value: number;
  created_at: string | number | Date;
}

export interface IEvaluationNamePair {
  id?: string;
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

export interface IConstraint extends IBaseTimestamp {
  description: string;
  id?: string;
  name: string;
}

export interface IGoal extends IConstraint { }

export interface ICsqLog {
  constraintId: string;
  goalId: string;
  id?: string;
  reviewer: string;
  targetId: string;
  value: number;
}

export interface IFqLog extends ICsqLog { }

export interface IGsqLog extends ICsqLog { }

export interface ICsqMetric {
  data: {
    [goalName: string]: {
      [constraintName: string]: number;
    };
  };
  groupId: string;
  groupName: string;
  metric: {
    [goalName: string]: {
      [constrainName: string]: number;
    };
  };
}

export interface ICsqGoalStructure {
  name: string;
  span: number;
}

export interface ICsqConstraintStructure {
  [constraintName: string]: {
    cohort: number;
    stdDev: number;
  };
}

export interface ICsqDataMetric {
  metric: ICsqMetric[];
  goalStruct: ICsqGoalStructure[];
  constraintStruct: ICsqConstraintStructure;
}

export interface IPfsTreeRowStructure {
  // Common
  childEntries?: Array<IPfsTreeRowStructure>;
  cpSatisfaction?: number;
  cpValue?: number;
  expanded?: boolean;
  groupCohort?: number;
  // Group-only
  groupName?: string;
  groupSatisfaction?: number;
  groupStdDev?: number;
  kind: 'individual' | 'group';
  // Individual-only
  studentId?: string;
  studentName?: string;
}

export interface IPfsDataMetric {
  treeData: IPfsTreeRowStructure[];
  stdDev: number;
  cohort: number;
}

export interface IGsqMetric {
  constraintAverage: number;
  constraintSatisfaction: number;
  data: {
    [goalName: string]: {
      [constraintName: string]: number;
    };
  };
  groupId: string;
  groupName: string;
}

export interface IGsqGoalStructure {
  name: string;
  span: number;
}

export interface IGsqDataMetric {
  metric: IGsqMetric[];
  goalStruct: IGsqGoalStructure[];
  stdDev: number;
  cohort: number;
}

export interface IFqMetric {
  constraintAverage: number;
  constraintSatisfaction: number;
  data: {
    [goalName: string]: number;
  };
  groupId: string;
  groupName: string;
}

export interface IFqGoalStructure {
  name: string;
  span: number;
}

export interface IFqDataMetric {
  metric: IFqMetric[];
  goalStruct: IFqGoalStructure[];
  stdDev: number;
  cohort: number;
}

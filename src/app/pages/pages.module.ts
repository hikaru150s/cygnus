import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { NotFoundModule } from './not-found/not-found.module';
import { GroupModule } from './group/group.module';
import { EvalModule } from './eval/eval.module';
import { CardModule } from './card/card.module';
import { StudentsModule } from './students/students.module';
import { GroupsModule } from './groups/groups.module';
import { AssignmentsStudentsModule } from './assignments-students/assignments-students.module';
import { AssignmentsGroupsModule } from './assignments-groups/assignments-groups.module';
import { AssignmentsEvalModule } from './assignments-eval/assignments-eval.module';
import { ScoringStudentsModule } from './scoring-students/scoring-students.module';
import { ScoringGroupsModule } from './scoring-groups/scoring-groups.module';
import { ScoringEvalModule } from './scoring-eval/scoring-eval.module';
import { CardsModule } from './cards/cards.module';
import { EvalFormModule } from './eval-form/eval-form.module';
import { SummaryModule } from './summary/summary.module';
import { GoalsModule } from './goals/goals.module';
import { ConstraintsModule } from './constraints/constraints.module';
import { CsqLogModule } from './csq-log/csq-log.module';
import { FqLogModule } from './fq-log/fq-log.module';
import { GsqLogModule } from './gsq-log/gsq-log.module';
import { MetricsModule } from './metrics/metrics.module';

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    DashboardModule,
    NotFoundModule,
    GroupModule,
    EvalModule,
    CardModule,
    StudentsModule,
    GroupsModule,
    AssignmentsStudentsModule,
    AssignmentsGroupsModule,
    AssignmentsEvalModule,
    ScoringStudentsModule,
    ScoringGroupsModule,
    ScoringEvalModule,
    CardsModule,
    EvalFormModule,
    SummaryModule,
    GoalsModule,
    ConstraintsModule,
    CsqLogModule,
    FqLogModule,
    GsqLogModule,
    MetricsModule,
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}

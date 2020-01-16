import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { GroupComponent } from './group/group.component';
import { EvalComponent } from './eval/eval.component';
import { CardComponent } from './card/card.component';
import { StudentsComponent } from './students/students.component';
import { GroupsComponent } from './groups/groups.component';
import { AssignmentsStudentsComponent } from './assignments-students/assignments-students.component';
import { AssignmentsGroupsComponent } from './assignments-groups/assignments-groups.component';
import { AssignmentsEvalComponent } from './assignments-eval/assignments-eval.component';
import { ScoringStudentsComponent } from './scoring-students/scoring-students.component';
import { ScoringGroupsComponent } from './scoring-groups/scoring-groups.component';
import { ScoringEvalComponent } from './scoring-eval/scoring-eval.component';
import { CardsComponent } from './cards/cards.component';
import { EvalFormComponent } from './eval-form/eval-form.component';
import { SummaryComponent } from './summary/summary.component';
import { GoalsComponent } from './goals/goals.component';
import { ConstraintsComponent } from './constraints/constraints.component';
import { CsqLogComponent } from './csq-log/csq-log.component';
import { FqLogComponent } from './fq-log/fq-log.component';
import { GsqLogComponent } from './gsq-log/gsq-log.component';
import { MetricsComponent } from './metrics/metrics.component';

const routes: Routes = [{
  path: '',
  component: PagesComponent,
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'group',
      component: GroupComponent,
    },
    {
      path: 'eval',
      component: EvalComponent,
    },
    {
      path: 'eval/:id',
      component: EvalFormComponent,
    },
    {
      path: 'card',
      component: CardComponent,
    },
    {
      path: 'students',
      component: StudentsComponent,
    },
    {
      path: 'groups',
      component: GroupsComponent,
    },
    {
      path: 'assignments/students',
      component: AssignmentsStudentsComponent,
    },
    {
      path: 'assignments/groups',
      component: AssignmentsGroupsComponent,
    },
    {
      path: 'assignments/eval',
      component: AssignmentsEvalComponent,
    },
    {
      path: 'scoring/students',
      component: ScoringStudentsComponent,
    },
    {
      path: 'scoring/groups',
      component: ScoringGroupsComponent,
    },
    {
      path: 'scoring/eval',
      component: ScoringEvalComponent,
    },
    {
      path: 'cards',
      component: CardsComponent,
    },
    {
      path: 'summary',
      component: SummaryComponent,
    },
    {
      path: 'goals',
      component: GoalsComponent,
    },
    {
      path: 'constaints',
      component: ConstraintsComponent,
    },
    {
      path: 'csq',
      component: CsqLogComponent,
    },
    {
      path: 'fq',
      component: FqLogComponent,
    },
    {
      path: 'gsq',
      component: GsqLogComponent,
    },
    {
      path: 'metrics',
      component: MetricsComponent,
    },
    {
      path: '',
      redirectTo: 'dashboard',
      pathMatch: 'full',
    },
    {
      path: '**',
      component: NotFoundComponent,
    },
  ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

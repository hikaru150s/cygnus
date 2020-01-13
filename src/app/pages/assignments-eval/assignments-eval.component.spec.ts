import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsEvalComponent } from './assignments-eval.component';

describe('AssignmentsEvalComponent', () => {
  let component: AssignmentsEvalComponent;
  let fixture: ComponentFixture<AssignmentsEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsEvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsStudentsComponent } from './assignments-students.component';

describe('AssignmentsStudentsComponent', () => {
  let component: AssignmentsStudentsComponent;
  let fixture: ComponentFixture<AssignmentsStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

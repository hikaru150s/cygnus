import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignmentsGroupsComponent } from './assignments-groups.component';

describe('AssignmentsGroupsComponent', () => {
  let component: AssignmentsGroupsComponent;
  let fixture: ComponentFixture<AssignmentsGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignmentsGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignmentsGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

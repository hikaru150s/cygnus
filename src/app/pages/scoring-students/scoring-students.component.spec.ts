import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringStudentsComponent } from './scoring-students.component';

describe('ScoringStudentsComponent', () => {
  let component: ScoringStudentsComponent;
  let fixture: ComponentFixture<ScoringStudentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringStudentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringStudentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

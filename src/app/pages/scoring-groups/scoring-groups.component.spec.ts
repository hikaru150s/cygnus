import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringGroupsComponent } from './scoring-groups.component';

describe('ScoringGroupsComponent', () => {
  let component: ScoringGroupsComponent;
  let fixture: ComponentFixture<ScoringGroupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringGroupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

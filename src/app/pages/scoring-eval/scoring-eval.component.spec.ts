import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScoringEvalComponent } from './scoring-eval.component';

describe('ScoringEvalComponent', () => {
  let component: ScoringEvalComponent;
  let fixture: ComponentFixture<ScoringEvalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScoringEvalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScoringEvalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

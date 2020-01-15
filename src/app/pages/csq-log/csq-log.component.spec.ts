import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CsqLogComponent } from './csq-log.component';

describe('CsqLogComponent', () => {
  let component: CsqLogComponent;
  let fixture: ComponentFixture<CsqLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CsqLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CsqLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

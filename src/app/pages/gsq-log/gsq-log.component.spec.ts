import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GsqLogComponent } from './gsq-log.component';

describe('GsqLogComponent', () => {
  let component: GsqLogComponent;
  let fixture: ComponentFixture<GsqLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GsqLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GsqLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FqLogComponent } from './fq-log.component';

describe('FqLogComponent', () => {
  let component: FqLogComponent;
  let fixture: ComponentFixture<FqLogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FqLogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FqLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

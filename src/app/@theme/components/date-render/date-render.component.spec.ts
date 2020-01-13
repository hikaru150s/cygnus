import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRenderComponent } from './date-render.component';

describe('DateRenderComponent', () => {
  let component: DateRenderComponent;
  let fixture: ComponentFixture<DateRenderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateRenderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateRenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

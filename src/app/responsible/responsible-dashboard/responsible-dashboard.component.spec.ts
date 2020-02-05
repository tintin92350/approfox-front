import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResponsibleDashboardComponent } from './responsible-dashboard.component';

describe('ResponsibleDashboardComponent', () => {
  let component: ResponsibleDashboardComponent;
  let fixture: ComponentFixture<ResponsibleDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResponsibleDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResponsibleDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

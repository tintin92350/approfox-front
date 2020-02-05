import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleRedirectingComponent } from './role-redirecting.component';

describe('RoleRedirectingComponent', () => {
  let component: RoleRedirectingComponent;
  let fixture: ComponentFixture<RoleRedirectingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RoleRedirectingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RoleRedirectingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

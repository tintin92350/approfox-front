import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMainNavigationComponent } from './student-main-navigation.component';

describe('StudentMainNavigationComponent', () => {
  let component: StudentMainNavigationComponent;
  let fixture: ComponentFixture<StudentMainNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMainNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMainNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

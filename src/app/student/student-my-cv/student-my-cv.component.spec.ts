import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMyCvComponent } from './student-my-cv.component';

describe('StudentMyCvComponent', () => {
  let component: StudentMyCvComponent;
  let fixture: ComponentFixture<StudentMyCvComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMyCvComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMyCvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

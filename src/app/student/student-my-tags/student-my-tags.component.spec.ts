import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentMyTagsComponent } from './student-my-tags.component';

describe('StudentMyTagsComponent', () => {
  let component: StudentMyTagsComponent;
  let fixture: ComponentFixture<StudentMyTagsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentMyTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentMyTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

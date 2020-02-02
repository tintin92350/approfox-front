import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessBoxComponent } from './success-box.component';

describe('SuccessBoxComponent', () => {
  let component: SuccessBoxComponent;
  let fixture: ComponentFixture<SuccessBoxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessBoxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

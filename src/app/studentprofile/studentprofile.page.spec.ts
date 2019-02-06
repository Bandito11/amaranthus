import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentProfilePage } from './studentprofile.page';

describe('StudentprofilePage', () => {
  let component: StudentProfilePage;
  let fixture: ComponentFixture<StudentProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentProfilePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckInPage } from './checkin.page';

describe('CheckInPage', () => {
  let component: CheckInPage;
  let fixture: ComponentFixture<CheckInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckInPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

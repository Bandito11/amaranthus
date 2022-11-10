import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GobackComponent } from './goback.component';

describe('GobackComponent', () => {
  let component: GobackComponent;
  let fixture: ComponentFixture<GobackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GobackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GobackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

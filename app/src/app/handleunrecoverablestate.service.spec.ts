import { TestBed } from '@angular/core/testing';

import { HandleUnrecoverableStateService } from './handleunrecoverablestate.service';

describe('HandleunrecoverablestateService', () => {
  let service: HandleUnrecoverableStateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HandleUnrecoverableStateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

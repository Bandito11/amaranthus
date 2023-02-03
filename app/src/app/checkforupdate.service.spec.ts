import { TestBed } from '@angular/core/testing';

import { CheckForUpdateService } from './checkforupdate.service';

describe('CheckforupdateService', () => {
  let service: CheckForUpdateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CheckForUpdateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

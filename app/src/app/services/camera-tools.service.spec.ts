import { TestBed } from '@angular/core/testing';

import { CameraToolsService } from './camera-tools.service';

describe('CameraToolsService', () => {
  let service: CameraToolsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CameraToolsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

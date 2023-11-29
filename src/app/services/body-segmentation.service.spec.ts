import { TestBed } from '@angular/core/testing';

import { BodySegmentationService } from './body-segmentation.service';

describe('BodySegmentationService', () => {
  let service: BodySegmentationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BodySegmentationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

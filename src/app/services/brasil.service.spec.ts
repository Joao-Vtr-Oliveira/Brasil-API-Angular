import { TestBed } from '@angular/core/testing';

import { BrasilService } from './brasil.service';

describe('BrasilService', () => {
  let service: BrasilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrasilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

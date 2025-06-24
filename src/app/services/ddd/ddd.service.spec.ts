import { TestBed } from '@angular/core/testing';

import { DddService } from './ddd.service';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

describe('DddService', () => {
  let service: DddService;
	let httpMock: HttpTestingController;
  
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [DddService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DddService);
    httpMock = TestBed.inject(HttpTestingController);
  });

    afterEach(() => {
      httpMock.verify();
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { DddService } from './ddd.service';
import { provideHttpClient } from '@angular/common/http';
import {
	HttpTestingController,
	provideHttpClientTesting,
} from '@angular/common/http/testing';
import { DDDError, DDDInterface, dddMockData, dddMockError } from './ddd.model';

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

	it('should fetch ddd and update signals on success', (done) => {
		service.fetchDdd('21').subscribe({
			next: (data) => {
				expect(data).toEqual(dddMockData);
				expect(service.readDdd()).toEqual(dddMockData);
				expect(service.readError()).toBe(null);
				done();
			},
			error: done,
		});
		const req = httpMock.expectOne('https://brasilapi.com.br/api/ddd/v1/21');
		expect(req.request.method).toBe('GET');

		req.flush(dddMockData);
	});

	it('should handle error and update error signal', (done) => {
		service.fetchDdd('00').subscribe({
			next: () => fail('should have failed'),
			error: (err) => {
				expect(err.type).toBe('ddd_error');
				expect(service.readDdd()).toBe(undefined);
				expect(service.readError()?.message).toBe('DDD não encontrado');
				done();
			},
		});
		const req = httpMock.expectOne('https://brasilapi.com.br/api/ddd/v1/00');
		expect(req.request.method).toBe('GET');

		req.flush(dddMockError, { status: 404, statusText: 'Not Found' });
	});

	it('should handle loading and update error signal', (done) => {
		service.fetchDdd('31').subscribe({
			next: () => {
				expect(service.readLoading()).toBe(false);
				done();
			},
		});

		const req = httpMock.expectOne('https://brasilapi.com.br/api/ddd/v1/31');

		expect(service.readLoading()).toBe(true);

		req.flush({});
	});
});

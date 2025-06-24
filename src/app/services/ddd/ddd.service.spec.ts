import { TestBed } from '@angular/core/testing';

import { DddService } from './ddd.service';
import { provideHttpClient } from '@angular/common/http';
import {
	HttpTestingController,
	provideHttpClientTesting,
} from '@angular/common/http/testing';
import { DDDInterface } from './ddd.model';

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
		const mockData: DDDInterface = {
			state: 'RJ',
			cities: [
				'TERESÓPOLIS',
				'TANGUÁ',
				'SEROPÉDICA',
				'SÃO JOÃO DE MERITI',
				'SÃO GONÇALO',
			],
		};
		service.fetchDdd('21').subscribe({
			next: (data) => {
				expect(data).toEqual(mockData);
				expect(service.readDdd()).toEqual(mockData);
				expect(service.readError()).toBe(null);
        done();
			},
			error: done,
		});
    const req = httpMock.expectOne('https://brasilapi.com.br/api/ddd/v1/21');
    expect(req.request.method).toBe('GET');

    req.flush(mockData);
	});
});

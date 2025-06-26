import { TestBed } from '@angular/core/testing';

import { CnpjService } from './cnpj.service';
import {
	HttpTestingController,
	provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CnpjInterface, cnpjMockData, cnpjMockError2 } from './cnpj.model';

describe('CnpjService', () => {
	let service: CnpjService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CnpjService, provideHttpClient(), provideHttpClientTesting()],
		});
		service = TestBed.inject(CnpjService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});
	it('should fetch cnpj and update signal on success', (done) => {
		service.fetchCnpj('06040998000215').subscribe({
			next: (data) => {
				expect(data).toEqual(cnpjMockData);
				expect(service.readCnpj()).toEqual(cnpjMockData);
				expect(service.readError()).toBe(null);
				done();
			},
			error: done,
		});

		const req = httpMock.expectOne(
			'https://brasilapi.com.br/api/cnpj/v1/06040998000215'
		);
		expect(req.request.method).toBe('GET');
		req.flush(cnpjMockData);
	});
	it('should handle error and update error signal', (done) => {
		service.fetchCnpj('99999999').subscribe({
			next: () => fail('should have failed'),
			error: (err) => {
				expect(err.type).toBe('cnpj_not_found');
				expect(service.readCnpj()).toBeUndefined();
				expect(service.readError()?.errors[0].message).toBe(
					'CNPJ não encontrado'
				);
				done();
			},
		});

		const req = httpMock.expectOne(
			'https://brasilapi.com.br/api/cnpj/v1/99999999'
		);
		req.flush(cnpjMockError2.error, {
			status: cnpjMockError2.status,
			statusText: cnpjMockError2.statusText,
		});
	});
	it('should handle loading and update error signal', (done) => {
		service.fetchCnpj('06040998000215').subscribe({
			next: () => {
				expect(service.readLoading()).toBe(false);
				done();
			},
		});

		const req = httpMock.expectOne(
			'https://brasilapi.com.br/api/cnpj/v1/06040998000215'
		);

		expect(service.readLoading()).toBe(true);

		req.flush({});
	});
});

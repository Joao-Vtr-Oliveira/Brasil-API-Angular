import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
	provideHttpClientTesting,
	HttpTestingController,
} from '@angular/common/http/testing';
import { CepService } from './cep.service';
import { cepMockData, cepMockError, cepMockError2 } from './cep.model';

describe('CepService', () => {
	let service: CepService;
	let httpMock: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [CepService, provideHttpClient(), provideHttpClientTesting()],
		});
		service = TestBed.inject(CepService);
		httpMock = TestBed.inject(HttpTestingController);
	});

	afterEach(() => {
		httpMock.verify();
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should fetch location and update signal on success', (done) => {

		service.fetchLocation('32676048').subscribe({
			next: (data) => {
				expect(data).toEqual(cepMockData);
				expect(service.readLocation()).toEqual(cepMockData);
				expect(service.readError()).toBe(null);
				done();
			},
			error: done,
		});

		const req = httpMock.expectOne(
			'https://brasilapi.com.br/api/cep/v2/32676048'
		);
		expect(req.request.method).toBe('GET');
		req.flush(cepMockData);
	});
	it('should handle error and update error signal', (done) => {


		service.fetchLocation('99999999').subscribe({
			next: () => fail('should have failed'),
			error: (err) => {
				expect(err.type).toBe('cep_not_found');
				expect(service.readLocation()).toBeUndefined();
				expect(service.readError()?.errors[0].message).toBe(
					'CEP não encontrado'
				);
				done();
			},
		});

		const req = httpMock.expectOne(
			'https://brasilapi.com.br/api/cep/v2/99999999'
		);
		req.flush(cepMockError2.error, {
			status: cepMockError2.status,
			statusText: cepMockError2.statusText,
		});
	});
	it('should handle loading and update error signal', (done) => {
		service.fetchLocation('32676048').subscribe({
			next: () => {
				expect(service.readLoading()).toBe(false);
				done();
			},
		});

		const req = httpMock.expectOne(
			'https://brasilapi.com.br/api/cep/v2/32676048'
		);

		expect(service.readLoading()).toBe(true);

		req.flush({});
	});
});

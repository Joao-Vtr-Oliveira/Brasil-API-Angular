import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
	provideHttpClientTesting,
	HttpTestingController,
} from '@angular/common/http/testing';
import { CepService } from './cep.service';
import { LocationCep } from './cep.model';

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
		const mockData: LocationCep = {
			cep: '32676048',
			state: 'MG',
			city: 'Betim',
			neighborhood: 'Amarante',
			street: 'Rua Padre Toledo',
			service: 'open-cep',
			location: {
				coordinates: {
					longitude: '-44.1388393',
					latitude: '-19.9468875',
				},
			},
		};

		service.fetchLocation('32676048').subscribe({
			next: (data) => {
				expect(data).toEqual(mockData);
				expect(service.readLocation()).toEqual(mockData);
				expect(service.readError()).toBe(null);
				done();
			},
			error: done,
		});

		const req = httpMock.expectOne(
			'https://brasilapi.com.br/api/cep/v2/32676048'
		);
		expect(req.request.method).toBe('GET');
		req.flush(mockData);
	});
	it('should handle error and update error signal', (done) => {
		const mockError = {
			status: 404,
			statusText: 'Not Found',
			error: {
				type: 'cep_not_found',
				errors: [
					{
						name: 'ServiceError',
						message: 'CEP não encontrado',
						service: 'brasilapi',
					},
				],
			},
		};

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
		req.flush(mockError.error, {
			status: mockError.status,
			statusText: mockError.statusText,
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

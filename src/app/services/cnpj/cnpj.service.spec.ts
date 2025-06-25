import { TestBed } from '@angular/core/testing';

import { CnpjService } from './cnpj.service';
import {
	HttpTestingController,
	provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CnpjInterface } from './cnpj.model';

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
		const mockData: CnpjInterface = {
			uf: 'MG',
			cep: 32604155,
			pais: null,
			email: null,
			porte: 'DEMAIS',
			bairro: 'ANGOLA',
			numero: '1503',
			municipio: 'BETIM',
			razao_social: 'PPI INFORMATICA E PAPELARIA LTDA',
			nome_fantasia: 'PORT PAPELARIA',
			ddd_telefone_1: '3133495031',
			ddd_telefone_2: '3133495039',
			cnaes_secundarios: [
				{
					codigo: 4751201,
					descricao:
						'Comércio varejista especializado de equipamentos e suprimentos de informática',
				},
			],
			natureza_juridica: 'Sociedade Empresária Limitada',
			data_inicio_atividade: '2009-03-23',
			qsa: [],
		};

		service.fetchCnpj('06040998000215').subscribe({
			next: (data) => {
				expect(data).toEqual(mockData);
				expect(service.readCnpj()).toEqual(mockData);
				expect(service.readError()).toBe(null);
				done();
			},
			error: done,
		});

		const req = httpMock.expectOne(
			'https://brasilapi.com.br/api/cnpj/v1/06040998000215'
		);
		expect(req.request.method).toBe('GET');
		req.flush(mockData);
	});
	it('should handle error and update error signal', (done) => {
		const mockError = {
			status: 404,
			statusText: 'Not Found',
			error: {
				type: 'cnpj_not_found',
				errors: [
					{
						name: 'ServiceError',
						message: 'CNPJ não encontrado',
						service: 'brasilapi',
					},
				],
			},
		};

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
		req.flush(mockError.error, {
			status: mockError.status,
			statusText: mockError.statusText,
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

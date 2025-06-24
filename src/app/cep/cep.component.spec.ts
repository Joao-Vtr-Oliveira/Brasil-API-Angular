import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CepComponent } from './cep.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CepService } from '../services/cep/cep.service';
import { Observable } from 'rxjs';
import { LocationCep, LocationError } from '../services/cep/cep.model';
import { signal } from '@angular/core';

class fakeCepService {
	private location = signal<LocationCep | undefined>(undefined);
	private error = signal<LocationError | null>(null);
	private loading = signal(false);

	readLocation = this.location.asReadonly();
	readError = this.error.asReadonly();
	readLoading = this.loading.asReadonly();

	setLoading(value: boolean) {
		this.loading.set(value);
	}

	mockData: LocationCep = {
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
	mockError: LocationError = {
		name: 'ServiceError',
		message: 'CEP não encontrado',
		type: 'service',
		errors: [],
	};

	fetchLocation(fetchCase: 'pass' | 'fail') {
		if (fetchCase === 'pass') return this.location.set(this.mockData);
		return this.error.set(this.mockError);
	}
}

describe('CepComponent', () => {
	let component: CepComponent;
	let fixture: ComponentFixture<CepComponent>;
	let service: fakeCepService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CepComponent],
			providers: [
				{ provide: CepService, useClass: fakeCepService },
				provideHttpClientTesting(),
				provideHttpClient(),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(CepComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.inject(CepService) as unknown as fakeCepService;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should test the input', async () => {
		const input: HTMLInputElement = fixture.nativeElement.querySelector(
			'[data-testid="inputText-cepComponent"]'
		);

		input.value = '31676048';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		service.fetchLocation('pass');
		fixture.detectChanges();
		await fixture.whenStable();

		const p = fixture.nativeElement.querySelector(
			'[data-testid="pState-cepComponent"]'
		) as HTMLParagraphElement;

		expect(p.textContent).toContain('MG');
	});
	it('should test the loading signal', async () => {
		service.setLoading(true);
		fixture.detectChanges();

		let loadingDiv: HTMLDivElement = fixture.nativeElement.querySelector(
			'[data-testid="divLoading-cepComponent"]'
		);
		expect(loadingDiv).toBeTruthy();

		service.setLoading(false);
		fixture.detectChanges();
		await fixture.whenStable();

		loadingDiv = fixture.nativeElement.querySelector(
			'[data-testid="divLoading-cepComponent"]'
		);

		expect(loadingDiv).toBeFalsy();
	});
});

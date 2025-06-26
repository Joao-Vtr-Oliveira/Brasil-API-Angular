import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CepComponent } from './cep.component';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { CepService } from '../services/cep/cep.service';
import { LocationCep, LocationError, cepMockData, cepMockError } from '../services/cep/cep.model';
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

	fetchLocation(fetchCase: 'pass' | 'fail') {
		if (fetchCase === 'pass') return this.location.set(cepMockData);
		return this.error.set(cepMockError);
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
	it('should test the error case', async () => {
		const input: HTMLInputElement = fixture.nativeElement.querySelector(
			'[data-testid="inputText-cepComponent"]'
		);

		input.value = '00000000';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		service.fetchLocation('fail');
		fixture.detectChanges();
		await fixture.whenStable();

		const pError = fixture.nativeElement.querySelector(
			'[data-testid="pError-cepComponent"]'
		) as HTMLParagraphElement;

		expect(pError.textContent).toContain('CEP não encontrado');
	});
});

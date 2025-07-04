import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CnpjComponent } from './cnpj.component';
import { CnpjError, CnpjInterface, cnpjMockData, cnpjMockError } from '../services/cnpj/cnpj.model';
import { signal } from '@angular/core';
import { CnpjService } from '../services/cnpj/cnpj.service';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

class fakeCnpjService {
	private cnpj = signal<CnpjInterface | undefined>(undefined);
	private error = signal<CnpjError | null>(null);
	private loading = signal(false);

	readCnpj = this.cnpj.asReadonly();
	readError = this.error.asReadonly();
	readLoading = this.loading.asReadonly();

	setLoading(value: boolean) {
		this.loading.set(value);
	}



	fetchCnpj(fetchCase: 'pass' | 'fail') {
		if (fetchCase === 'pass') return this.cnpj.set(cnpjMockData);
		return this.error.set(cnpjMockError);
	}
}

describe('CnpjComponent', () => {
	let component: CnpjComponent;
	let fixture: ComponentFixture<CnpjComponent>;
	let service: fakeCnpjService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [CnpjComponent],
			providers: [
				{ provide: CnpjService, useClass: fakeCnpjService },
				provideHttpClientTesting(),
				provideHttpClient(),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(CnpjComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.inject(CnpjService) as unknown as fakeCnpjService;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should test the input', async () => {
		const input: HTMLInputElement = fixture.nativeElement.querySelector(
			'[data-testid="inputText-cnpjComponent"]'
		);
		input.value = '06040998000215';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		service.fetchCnpj('pass');
		fixture.detectChanges();
		await fixture.whenStable();

		const pName = fixture.nativeElement.querySelector(
			'[data-testid="pName-cepComponent"]'
		) as HTMLParagraphElement;

		expect(pName.textContent).toContain(service.readCnpj()?.nome_fantasia);
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
			'[data-testid="inputText-cnpjComponent"]'
		);

		input.value = '00000000';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		service.fetchCnpj('fail');
		fixture.detectChanges();
		await fixture.whenStable();

		const pError = fixture.nativeElement.querySelector(
			'[data-testid="pError-cnpjComponent"]'
		) as HTMLParagraphElement;

		expect(pError.textContent).toContain(service.readError()?.message);
	});
});

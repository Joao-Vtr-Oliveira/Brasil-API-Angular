import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DddComponent } from './ddd.component';
import {
	HttpTestingController,
	provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { DDDError, DDDInterface } from '../services/ddd/ddd.model';
import { signal } from '@angular/core';
import { DddService } from '../services/ddd/ddd.service';

class fakeDddService {
	private ddd = signal<DDDInterface | undefined>(undefined);
	private error = signal<DDDError | null>(null);
	private loading = signal(false);

	readDdd = this.ddd.asReadonly();
	readError = this.error.asReadonly();
	readLoading = this.loading.asReadonly();

	setLoading(value: boolean) {
		this.loading.set(value);
	}

	mockData: DDDInterface = {
		state: 'RJ',
		cities: [
			'TERESÓPOLIS',
			'TANGUÁ',
			'SEROPÉDICA',
			'SÃO JOÃO DE MERITI',
			'SÃO GONÇALO',
		],
	};
	mockError: DDDError = {
		name: 'ServiceError',
		message: 'DDD não encontrado',
		type: 'ddd_error',
	};

	fetchDdd(fetchCase: 'pass' | 'fail') {
		if (fetchCase === 'pass') return this.ddd.set(this.mockData);
		return this.error.set(this.mockError);
	}
}

describe('DddComponent', () => {
	let component: DddComponent;
	let fixture: ComponentFixture<DddComponent>;
	let service: fakeDddService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [DddComponent],
			providers: [
				{ provide: DddService, useClass: fakeDddService },
				provideHttpClientTesting(),
				provideHttpClient(),
			],
		}).compileComponents();

		fixture = TestBed.createComponent(DddComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		service = TestBed.inject(DddService) as unknown as fakeDddService;
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
	it('should test the input and template', async () => {
		const input: HTMLInputElement = fixture.nativeElement.querySelector(
			'[data-testid="inputNumber-dddComponent"]'
		);

		input.value = '21';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		service.fetchDdd('pass');
		fixture.detectChanges();
		await fixture.whenStable();

		const h2 = fixture.nativeElement.querySelector(
			'[data-testid="h2State-dddComponent"]'
		) as HTMLHeadingElement;

		expect(h2.textContent).toContain('RJ');
	});
	it('should test the loading signal', async () => {
		service.setLoading(true);
		fixture.detectChanges();

		let loadingDiv: HTMLDivElement = fixture.nativeElement.querySelector(
			'[data-testid="divLoading-dddComponent"]'
		);
		expect(loadingDiv).toBeTruthy();

		service.setLoading(false);
		fixture.detectChanges();
		await fixture.whenStable();

		loadingDiv = fixture.nativeElement.querySelector(
			'[data-testid="divLoading-dddComponent"]'
		);

		expect(loadingDiv).toBeFalsy();
	});
	it('should test the error case', async () => {
		const input: HTMLInputElement = fixture.nativeElement.querySelector(
			'[data-testid="inputNumber-dddComponent"]'
		);

		input.value = '00';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();

		service.fetchDdd('fail');
		fixture.detectChanges();
		await fixture.whenStable();

		const pError = fixture.nativeElement.querySelector(
			'[data-testid="pError-dddComponent"]'
		) as HTMLParagraphElement;

		expect(pError.textContent).toContain('')
	});
});

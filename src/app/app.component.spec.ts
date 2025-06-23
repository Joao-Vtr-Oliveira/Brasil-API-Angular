import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import {
	provideHttpClientTesting,
	HttpTestingController,
} from '@angular/common/http/testing';

describe('AppComponent', () => {
	let httpMock: HttpTestingController;
	let component: AppComponent;
	let fixture: ComponentFixture<AppComponent>;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [AppComponent],
			providers: [provideHttpClient(), provideHttpClientTesting()],
		}).compileComponents();
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		httpMock = TestBed.inject(HttpTestingController);
	});

	it('should create the app', () => {
		expect(component).toBeTruthy();
	});
});

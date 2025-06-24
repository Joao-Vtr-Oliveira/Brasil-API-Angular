import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DddComponent } from './ddd.component';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('DddComponent', () => {
  let component: DddComponent;
  let fixture: ComponentFixture<DddComponent>;
	let httpMock: HttpTestingController;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DddComponent],
      providers: [provideHttpClientTesting(), provideHttpClient()]
    })
    .compileComponents();

    // httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(DddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

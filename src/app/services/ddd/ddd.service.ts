import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { DDDError, DDDInterface } from './ddd.model';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class DddService {
	private httpClient = inject(HttpClient);
	private ddd = signal<DDDInterface | undefined>(undefined);
	private error = signal<DDDError | null>(null);
	private loading = signal(false);

	readDdd = this.ddd.asReadonly();
	readError = this.error.asReadonly();
	readLoading = this.loading.asReadonly();

	fetchDdd(ddd: string) {
		this.loading.set(true);
		return this.httpClient
			.get<DDDInterface>(`https://brasilapi.com.br/api/ddd/v1/${ddd}`, {})
			.pipe(
				tap((dddData) => {
					this.ddd.set(dddData);
					this.error.set(null);
					this.loading.set(false);
				}),
				catchError((error: HttpErrorResponse) => {
					const newError: DDDError = error.error;
					this.loading.set(false);
					console.log('newError', newError)
					this.error.set(newError);
					this.ddd.set(undefined);
					return throwError(() => newError);
				})
			);
	}
}

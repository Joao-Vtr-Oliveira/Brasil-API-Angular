import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { CnpjError, CnpjInterface } from './cnpj.model';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CnpjService {
	private httpClient = inject(HttpClient);
	private cnpj = signal<CnpjInterface | undefined>(undefined);
	private error = signal<CnpjError | null>(null);
	private loading = signal(false);

	readCnpj = this.cnpj.asReadonly();
	readError = this.error.asReadonly();
	readLoading = this.loading.asReadonly();

	fetchCnpj(cnpj: string) {
		this.loading.set(true);
		this.error.set(null);
		return this.httpClient
			.get<CnpjInterface>(`https://brasilapi.com.br/api/cnpj/v1/${cnpj}`, {})
			.pipe(
				tap((cnpjData) => {
					this.cnpj.set(cnpjData);
					this.error.set(null);
					this.loading.set(false);
					console.log(cnpjData);
				}),
				catchError((error: HttpErrorResponse) => {
					const parsedError = this.handleError(error);
					console.log('readError: ', this.readError());
					this.loading.set(false);

					return throwError(() => parsedError);
				})
			);
	}

	handleError(error: HttpErrorResponse | CnpjError) {
		let parsedError: CnpjError;
		if (error instanceof HttpErrorResponse) {
			parsedError = {
				name: error.name,
				message: error.message,
				type: error.error?.type ?? 'unkown',
				errors: error.error?.errors ?? [],
			};
		} else {
			parsedError = error;
		}

		this.error.set(parsedError);
		this.cnpj.set(undefined);

		return parsedError;
	}
}

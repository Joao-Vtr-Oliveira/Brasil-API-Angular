import { inject, Injectable, signal } from '@angular/core';
import { LocationCep, LocationError } from './cep.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, of, tap, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CepService {
	private httpClient = inject(HttpClient);
	private location = signal<LocationCep | undefined>(undefined);
	private error = signal<LocationError | null>(null);
	private loading = signal(false)

	readLocation = this.location.asReadonly();
	readError = this.error.asReadonly();
	readLoading = this.loading.asReadonly();

	fetchLocation(cep: string) {
		this.loading.set(true);
		this.error.set(null);
		return this.httpClient
			.get<LocationCep>(`https://brasilapi.com.br/api/cep/v2/${cep}`, {})
			.pipe(
				tap((locationData) => {
					this.location.set(locationData);
					this.error.set(null);
					this.loading.set(false);
					console.log(locationData);
				}),
				catchError((error: HttpErrorResponse) => {
					const parsedError = this.handleError(error);
					console.log('readError: ', this.readError())
					this.loading.set(false);
					
					return throwError(() => parsedError)
				})
			);
	}

	handleError(error: HttpErrorResponse | LocationError) {
		let parsedError: LocationError;
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
		this.location.set(undefined);

		return parsedError;
	}

}

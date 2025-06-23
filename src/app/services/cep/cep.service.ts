import { inject, Injectable, signal } from '@angular/core';
import { LocationCep, LocationError } from './cep.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CepService {
	private httpClient = inject(HttpClient);
	private location = signal<LocationCep | undefined>(undefined);
	private error = signal<LocationError | null>(null);

	readLocation = this.location.asReadonly();
	readError = this.error.asReadonly();

	fetchLocation(cep: string) {
		return this.httpClient
			.get<LocationCep>(`https://brasilapi.com.br/api/cep/v2/${cep}`, {})
			.pipe(
				tap((locationData) => {
					this.location.set(locationData);
					this.error.set(null);
					console.log(locationData);
				}),
				catchError((error: HttpErrorResponse) => {
					const newError = this.handleError(error);

					return throwError(() => newError);
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

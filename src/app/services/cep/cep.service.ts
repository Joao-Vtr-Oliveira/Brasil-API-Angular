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
					console.log(locationData);
				}),
				catchError((error: HttpErrorResponse) => {
					const parsedError: LocationError = {
						name: error.name,
						message: error.message,
						type: error.error?.type ?? 'unkown',
						errors: error.error?.errors ?? []
					};

					this.error.set(parsedError)
					this.location.set(undefined);

					return throwError(() => parsedError);
				})
			);
	}
}

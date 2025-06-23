import { inject, Injectable, signal } from '@angular/core';
import { LocationCep } from './cep.model';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class CepService {
	private httpClient = inject(HttpClient);
	private location = signal<LocationCep | undefined>(undefined);

	readLocation = this.location.asReadonly();

	fetchLocation(cep: string) {
		return this.httpClient
			.get<LocationCep>(`https://brasilapi.com.br/api/cep/v1/${cep}`, {})
			.pipe(
				tap((locationData) => {
					this.location.set(locationData);
				})
			);
	}
}

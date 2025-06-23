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

	readDdd = this.ddd.asReadonly();
	readError = this.error.asReadonly();

	fetchDdd(ddd: string) {
		return this.httpClient
			.get<DDDInterface>(`https://brasilapi.com.br/api/ddd/v1/${ddd}`, {})
			.pipe(
				tap((dddData) => {
					this.ddd.set(dddData);
					this.error.set(null);
					console.log(dddData);
				}),
				catchError((error: HttpErrorResponse) => {
					const newError: DDDError = {
            name: error.name,
            message: error.message,
            type: error.type.toString(),
          }
          this.error.set(newError);
					return throwError(() => newError);
				})
			);
	}
}

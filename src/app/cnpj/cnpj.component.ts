import { Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CnpjService } from '../services/cnpj/cnpj.service';
import { CnpjError } from '../services/cnpj/cnpj.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@Component({
	selector: 'app-cnpj',
	imports: [
		MatButtonModule,
		MatCardModule,
		FormsModule,
		MatInputModule,
		MatFormFieldModule,
		MatIconModule,
    MatProgressSpinnerModule
	],
	templateUrl: './cnpj.component.html',
	styleUrl: './cnpj.component.css',
})
export class CnpjComponent {
	cnpjService = inject(CnpjService);

	cnpj = signal('');

	readCnpj = this.cnpjService.readCnpj;

	// onKeyUp() {
	// 	this.cep.update((oldCep) => oldCep.replace(/\D/g, ''));
	// 	console.log(this.cep());
	// }

	// onCepChange() {
	// 	const check = this.checkValue();
	// 	console.log(check);
	// 	if (check) this.cepService.fetchLocation(this.cep()).subscribe();
	// }

// 	checkValue() {
// 		const parsedError: CnpjError = {
// 			name: 'CEP inválido',
// 			message: '',
// 			type: '',
// 			errors: [
// 				{
// 					message: 'CEP inválido, por favor escreva novamente.',
// 				},
// 			],
// 		};
// 		if (this.cep().length !== 8) {
// 			this.cepService.handleError(parsedError);
// 		}
// 		return this.cep().length === 8;
// 	}
}

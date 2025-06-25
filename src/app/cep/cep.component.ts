import {
	Component,
	computed,
	inject,
	signal,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CepService } from '../services/cep/cep.service';
import { MatIconModule } from '@angular/material/icon';
import { LocationError } from '../services/cep/cep.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-cep',
	imports: [
		MatCardModule,
		MatButtonModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatProgressSpinnerModule,
	],
	templateUrl: './cep.component.html',
	styleUrl: './cep.component.css',
})
export class CepComponent {
	cepService = inject(CepService);
	cep = signal('');
	cepController = signal('');

	location = this.cepService.readLocation;

	mapsUrl = computed(
		() =>
			'https://www.google.com/maps?q=' +
			this.location()?.location?.coordinates?.latitude +
			',' +
			this.location()?.location?.coordinates?.longitude
	);

	onKeyUp() {
		this.cep.update((oldCep) => oldCep.replace(/[^0-9-]/g, ''));
		this.cepController.set(this.cep().replace(/\D/g, ''));
	}

	onCepChange() {
		this.cep.update((oldCep) => oldCep.replace(/[^0-9-]/g, ''));
		this.cepController.set(this.cep().replace(/\D/g, ''));
		
		const check = this.checkValue();
		console.log(this.cepController())
		if (check) this.cepService.fetchLocation(this.cepController()).subscribe();
	}

	checkValue() {
		const parsedError: LocationError = {
			name: 'CEP inválido',
			message: '',
			type: '',
			errors: [
				{
					name: '',
					message: 'CEP inválido, por favor escreva novamente.',
					service: '',
				},
			],
		};
		if (this.cepController().length !== 8) {
			this.cepService.handleError(parsedError);
		}
		return this.cepController().length === 8;
	}
}

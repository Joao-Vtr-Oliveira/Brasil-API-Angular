import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CepService } from '../services/cep/cep.service';
import { MatIconModule } from '@angular/material/icon';
import { LocationError } from '../services/cep/cep.model';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@Component({
	selector: 'app-cep',
	imports: [
		MatCardModule,
		MatButtonModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatProgressSpinnerModule
	],
	templateUrl: './cep.component.html',
	styleUrl: './cep.component.css',
})
export class CepComponent {
	cepService = inject(CepService);
	cep = '';

	location = this.cepService.readLocation;

	mapsUrl = computed(
		() =>
			'https://www.google.com/maps?q=' +
			this.location()?.location?.coordinates?.latitude +
			',' +
			this.location()?.location?.coordinates?.longitude
	);

	onCepChange() {
		const check = this.checkValue();
		if (check) {
			this.cepService.fetchLocation(this.cep).subscribe();
		}
	}

	checkValue() {
		const regex = /^\d{5}-?\d{3}$/;
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
		this.cepService.handleError(parsedError);
		return this.cep.match(regex);
	}
}

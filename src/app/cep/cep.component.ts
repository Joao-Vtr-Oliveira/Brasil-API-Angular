import { Component, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CepService } from '../services/cep/cep.service';
import { MatIconModule } from '@angular/material/icon';
import { LocationError } from '../services/cep/cep.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

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

	constructor(private sanitizer: DomSanitizer) {
		effect(() => {
			const loc = this.location();
			if (!loc) {
				this.mapsUrlIframe.set(null);
				return;
			}

			const lat = loc.location.coordinates.latitude;
			const lng = loc.location.coordinates.longitude;
			const url = `https://maps.google.com/maps?q=${lat},${lng}&hl=pt-BR&z=14&output=embed`;
			this.mapsUrlIframe.set(
				this.sanitizer.bypassSecurityTrustResourceUrl(url)
			);
		});
	}
	mapsUrlIframe = signal<SafeResourceUrl | null>(null);

	location = this.cepService.readLocation;


	onKeyUp() {
		this.cep.update((oldCep) => oldCep.replace(/[^0-9-]/g, ''));
		this.cepController.set(this.cep().replace(/\D/g, ''));
	}

	onCepChange() {
		this.cep.update((oldCep) => oldCep.replace(/[^0-9-]/g, ''));
		this.cepController.set(this.cep().replace(/\D/g, ''));

		const check = this.checkValue();
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

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
import { CepService } from './services/cep/cep.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: 'app-root',
	imports: [
		MatCardModule,
		MatButtonModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
	],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
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
		this.cepService.fetchLocation(this.cep).subscribe();
	}
}

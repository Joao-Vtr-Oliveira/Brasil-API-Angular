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
import { DddService } from '../services/ddd/ddd.service';

@Component({
	selector: 'app-ddd',
	imports: [
		MatCardModule,
		MatButtonModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
	],
	templateUrl: './ddd.component.html',
	styleUrl: './ddd.component.css',
})
export class DddComponent {
	dddService = inject(DddService);
  
	ddd = this.dddService.readDdd;
	dddModal = '';


	onDddChange() {
			this.dddService.fetchDdd(this.dddModal).subscribe();
	}
}

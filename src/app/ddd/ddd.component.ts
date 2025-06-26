import {
	Component,
	inject,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { DddService } from '../services/ddd/ddd.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
	selector: 'app-ddd',
	imports: [
		MatCardModule,
		MatButtonModule,
		FormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatProgressSpinnerModule,
	],
	templateUrl: './ddd.component.html',
	styleUrl: './ddd.component.css',
})
export class DddComponent {
	dddService = inject(DddService);

	ddd = this.dddService.readDdd;
	dddModal: number | undefined;
	

	onDddChange() {
		this.dddService.fetchDdd(String(this.dddModal)).subscribe();
	}
}

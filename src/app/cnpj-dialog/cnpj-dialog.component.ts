import {
	ChangeDetectionStrategy,
	Component,
	computed,
	inject,
	input,
	OnInit,
	signal,
	Signal,
} from '@angular/core';
import {
	MAT_DIALOG_DATA,
	MatDialogModule,
	MatDialogRef,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CnpjInterface } from '../services/cnpj/cnpj.model';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { CepService } from '../services/cep/cep.service';

@Component({
	standalone: true,
	selector: 'app-confirm-dialog',
	imports: [MatDialogModule, MatButtonModule, MatChipsModule, MatIconModule],
	templateUrl: './cnpj-dialog.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent implements OnInit {
	dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);

	cnpj = inject(MAT_DIALOG_DATA) as Signal<CnpjInterface>;
	readCnpj = this.cnpj();

	cepService = inject(CepService);
	location = this.cepService.readLocation;
	mapsUrl = signal('');

	ngOnInit(): void {
		this.cepService
			.fetchLocation(this.readCnpj.cep.toString())
			.subscribe((loc) => {
				if (loc?.location?.coordinates) {
					this.mapsUrl.set(
						'https://www.google.com/maps?q=' +
							loc.location.coordinates.latitude +
							',' +
							loc.location.coordinates.longitude
					);
				}
			});

	}

	onConfirm() {
		this.dialogRef.close(true);
	}

	onCancel() {
		this.dialogRef.close(false);
	}
}

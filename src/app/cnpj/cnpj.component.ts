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
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../cnpj-dialog/cnpj-dialog.component';


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
  cnpjController = signal('');

	readCnpj = this.cnpjService.readCnpj;

	onKeyUp() {
		this.cnpj.update((oldCnpj) => oldCnpj.replace(/[^0-9.-]/g, ''));
    this.cnpjController.set(this.cnpj().replace(/\D/g, ''))
	}

	onCnpjChange() {
		this.cnpj.update((oldCnpj) => oldCnpj.replace(/[^0-9.-]/g, ''));
    this.cnpjController.set(this.cnpj().replace(/\D/g, ''))
		const check = this.checkValue();
		if(check) this.cnpjService.fetchCnpj(this.cnpjController()).subscribe();
	}

	constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			data: this.readCnpj
		});

    dialogRef.afterClosed().subscribe(result => {});

}

	checkValue() {
		const parsedError: CnpjError = {
			name: 'CNPJ inválido',
			message: '',
			type: '',
			errors: [
				{
					message: 'CNPJ inválido, por favor escreva novamente.',
				},
			],
		};
		if (this.cnpjController().length !== 14) {
			this.cnpjService.handleError(parsedError);
		}
		return this.cnpjController().length === 14;
	}
}

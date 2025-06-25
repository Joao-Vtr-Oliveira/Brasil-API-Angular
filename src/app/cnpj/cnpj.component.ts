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
	}

	onCnpjChange() {
		// const check = this.checkValue();
		// console.log(check);
    this.cnpjController.set(this.cnpj().replace(/\D/g, ''))
    console.log(this.cnpj());
    console.log(this.cnpjController())
		this.cnpjService.fetchCnpj(this.cnpjController()).subscribe();
	}

	constructor(private dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
			data: this.readCnpj
		});

    dialogRef.afterClosed().subscribe(result => {
      console.log('Dialog fechado com:', result);
      // true (confirmar), false (cancelar)
    });

}

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

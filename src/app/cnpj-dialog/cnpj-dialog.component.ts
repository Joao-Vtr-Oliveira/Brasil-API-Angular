import { ChangeDetectionStrategy, Component, inject, input, Signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { CnpjInterface } from '../services/cnpj/cnpj.model';
import {MatChipsModule} from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';


@Component({
	standalone: true,
	selector: 'app-confirm-dialog',
	imports: [MatDialogModule, MatButtonModule, MatChipsModule, MatIconModule],
	templateUrl: './cnpj-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmDialogComponent {
  cnpj = inject<Signal<CnpjInterface>>(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<ConfirmDialogComponent>);


	onConfirm() {
		this.dialogRef.close(true);
	}

	onCancel() {
		this.dialogRef.close(false);
	}

  onPhoneClick() {
    
  }
}

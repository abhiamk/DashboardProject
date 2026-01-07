import { Component, computed, Inject, signal } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormDialogData } from './form-dialog.types';
import { MaterialModule } from '../../material.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-common-popup',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './common-popup.component.html',
  styleUrl: './common-popup.component.css'
})
export class CommonPopupComponent {
  constructor(
    private dialogRef: MatDialogRef<CommonPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: FormDialogData
  ) { }

  submit() {
    this.data.form.markAllAsTouched();
    if (this.data.form.valid && this.data.mode !== 'view') {
      this.dialogRef.close(this.data.form.value);
    }
  }

  cancel() {
    this.dialogRef.close(null);
  }

}

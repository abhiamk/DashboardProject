import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormErrorMsgService } from '../../shared/form-error-msg.service';
import { MockApiService } from '../../API-Service/mock-api.service';
import { Inventories } from '../inventories';

@Component({
  selector: 'app-mock-popup',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, CommonModule],
  templateUrl: './mock-popup.component.html',
  styleUrl: './mock-popup.component.css'
})
export class MockPopupComponent implements OnInit {
  myForm!: FormGroup;
  formData!: Inventories;
  constructor(private fb: FormBuilder,
    private formErrorMsgService: FormErrorMsgService,
    private _mdr: MatDialogRef<MockPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private mockApiService: MockApiService
  ) {
    if (data) {
      this.formData = data;
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.load(this.formData);
  }

  initForm() {
    this.myForm = this.fb.group({
      item: ['', [Validators.required, Validators.minLength(2)]],
      price: [0, [Validators.required, Validators.min(0)]],
      currentCount: [0, [Validators.required, Validators.min(0)]],
      TotalCount: [0, [Validators.required, Validators.min(0)]],
      imgURL: ['', [Validators.required, Validators.pattern(/^(https?:\/\/|data:|\/).*/i)]],
    });
  }

  load(item: any) {
    this.myForm.patchValue(item);
  }

  resetForm() {
    this.myForm.reset();
  }

  //Validation handel

  isFieldInvalid(fieldName: string, index?: number): boolean {
    return this.formErrorMsgService.isFieldInvalid(this.myForm, fieldName);
  }

  getNameErrorMessage(fcn: string, field: string) {
    const error = this.formErrorMsgService.getNameErrorMessage(fcn, field, this.myForm);
    return error;
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    if (this.formData.item) {
      this.mockApiService.putMockInventories(this.formData, this.myForm.value).subscribe({
        next: (data: Inventories) => {
          alert(`${data.item} updated successfully`);
          this._mdr.close(true);
        },
        error: (err) => {
          alert(err)
        }
      })
    } else {
      this.mockApiService.postMockInventories(this.myForm.value).subscribe({
        next: (data: Inventories) => {
          alert(`${this.myForm.value.item} added successfully`)
          this._mdr.close(true);
        },
        error: (err) => {
          alert(err)
        }
      })
    }

  }

  onSubmit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    // If id control was disabled and you need it, include it manually:
    const output = { ...this.myForm.getRawValue() }; // includes disabled fields
    this._mdr.close(true);

  }

  CloseDialog() {
    this._mdr.close(false);
  }
}

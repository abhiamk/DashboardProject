import { Injectable } from '@angular/core';
import { AbstractControl, FormArray, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormErrorMsgService {

  constructor() { }

  //Validation handel
  isFieldInvalid(form: FormGroup, fieldName: string, index?: number, arrayName?: string): boolean {
    let control: AbstractControl | null = null;

    if (arrayName && typeof index === 'number') {
      const arr = form.get(arrayName) as FormArray | null;
      if (!arr) return false;
      const item = arr.at(index);
      control = item ? item.get(fieldName) : null;
    } else {
      control = form.get(fieldName);
    }

    // Consider touched OR dirty as user interaction (adjust if you only want touched).
    return !!(control && control.invalid && (control.touched || control.dirty));
  }


  getNameErrorMessage(formcontrolname: string, field: string, myForm: FormGroup) {
    const nc = myForm.get(formcontrolname);

    if (nc?.errors?.['required']) {
      return `${field} is required`;
    }

    if (nc?.errors?.['minlength']) {
      return `${field} must be at least ${nc.errors['minlength'].requiredLength} characters`;
    }

    if (nc?.errors?.['maxlength']) {
      return `${field} cannot exceed ${nc.errors['maxlength'].requiredLength} characters`;
    }

    if (nc?.errors?.['email']) {
      return `Please enter a valid email address`;
    }
    return '';
  }

}

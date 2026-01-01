import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormErrorMsgService } from '../../shared/form-error-msg.service';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { CommonService } from '../../shared/CommonService/common.service';

@Component({
  selector: 'app-forms',
  standalone: true,
  imports: [ReactiveFormsModule, MaterialModule, CommonModule],
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.css'
})
export class FormsComponent implements OnInit {
  // currentMsg = '';
  myForm!: FormGroup;
  forkJoinResult: any;

  constructor(
    private fb: FormBuilder,
    private formErrorMsgService: FormErrorMsgService,
    private commonSer: CommonService) {

  }

  ngOnInit(): void {
    this.initForm();
    this.addSkills();
    this.getData();
  }

  initForm() {
    this.myForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      email: ['', [Validators.required, Validators.email]],
      lName: ['', [Validators.required]],
      skills: this.fb.array([], [Validators.required, Validators.minLength(1)])
    })
  }

  getData() {
    this.commonSer.getDataWithForkJoin().subscribe({
      next: res => {
        // each key could be a real response or an error object we created
        this.forkJoinResult = res;
      },
      error: err => {
        // unlikely because we convert errors to safe values, but keep for safety
        this.forkJoinResult = { __fatal: true, err };
      }
    });
  }


  get skills() {
    return this.myForm.get('skills') as FormArray;
  }

  createSkills(): FormGroup {
    return this.fb.group({
      skillName: ['', [Validators.required, Validators.minLength(3)]],
      address: ['', Validators.required],
      proficiency: ['beginner', Validators.required]
    })
  }

  addSkills() {
    this.skills.push(this.createSkills());
  }

  removeSkills(i: number) {
    this.skills.removeAt(i);
  }

  submit() {
    if (this.myForm.invalid) {
      this.myForm.markAllAsTouched();
      return;
    }
    console.log(this.myForm.value);
  }

  resetForm() {
    this.myForm.reset();
    this.skills.clear();
    this.addSkills();
  }

  //Validation handel

  isFieldInvalid(fieldName: string, index?: number): boolean {
    // if (index !== undefined) {
    //   const skilled = this.skills.at(index).get(fieldName);
    //   return !!(skilled && skilled.invalid && skilled.touched)
    // }

    // const control = this.myForm.get(fieldName);
    // return !!(control && control.invalid && control.touched)
    if (typeof index === 'number') {
      return this.formErrorMsgService.isFieldInvalid(this.myForm, fieldName, index, 'skills');
    }
    return this.formErrorMsgService.isFieldInvalid(this.myForm, fieldName);
  }


  // Get error message for name field

  getNameErrorMessage(fcn: string, field: string) {
    const error = this.formErrorMsgService.getNameErrorMessage(fcn, field, this.myForm);
    return error;
    // const nc = this.myForm.get('name');
    // if (nc?.errors?.['required']) {
    //   return `${field} is required`;
    // }
    // if (nc?.errors?.['minlength']) {
    //   return `${field} must be at least ${nc.errors['minlength'].requiredLength} characters`;
    // }

    // if (nc?.errors?.['maxlength']) {
    //   return `${field} cannot exceed ${nc.errors['maxlength'].requiredLength} characters`;
    // }

    // return '';
  }

  getSkillNameErrorMessage(field: string, index: number) {
    const scn = this.skills.at(index).get(field);
    if (scn?.errors?.['required']) {
      return `${field} is required`;
    }
    if (scn?.errors?.['minlength']) {
      return `${field} must be at least ${scn.errors['minlength'].requiredLength} characters`;
    }

    if (scn?.errors?.['maxlength']) {
      return `${field} cannot exceed ${scn.errors['maxlength'].requiredLength} characters`;
    }
    // const pr = this.skills.at(index).get('proficiency');
    // if (pr?.errors?.['required']) {
    //   return 'Proficiency is required';
    // }

    // const address = this.skills.at(index).get('address');
    // if (address?.errors?.['required']) {
    //   return 'Address is required';
    // }
    return '';
  }
}

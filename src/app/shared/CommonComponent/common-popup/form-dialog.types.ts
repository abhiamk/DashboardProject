import { TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface FormDialogData {
  title: string;
  form: FormGroup;
  mode: 'add' | 'edit' | 'view';
  template: TemplateRef<any>;

}

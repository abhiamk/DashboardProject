import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from '../../../shared/material.module';

@Component({
  selector: 'app-dynamic-popup',
  standalone: true,
  imports: [MaterialModule],
  templateUrl: './dynamic-popup.component.html',
  styleUrl: './dynamic-popup.component.css'
})
export class DynamicPopupComponent implements OnInit {
  name: string;
  constructor(
    private _mdr: MatDialogRef<DynamicPopupComponent>,
    @Inject(MAT_DIALOG_DATA) data: { name: '' }
  ) {
    this.name = data.name;
  }

  ngOnInit(): void {
    // alert('Hi')
  }
  submit(){
    this._mdr.close(true);
  }

  CloseDialog() {
    this._mdr.close(false);
  }
}

import { CommonModule } from '@angular/common';
import { Component, effect, signal, TemplateRef, ViewChild } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { combineLatest, switchMap, tap } from 'rxjs';
import { CommonPopupComponent } from '../../shared/CommonComponent/common-popup/common-popup.component';
import { MaterialModule } from '../../shared/material.module';
import { User } from '../../user/user';
import { UserApiService } from '../../user/user-api.service';

@Component({
  selector: 'app-dynamic-dashboard',
  standalone: true,
  imports: [MaterialModule, CommonModule, ReactiveFormsModule],
  templateUrl: './dynamic-dashboard.component.html',
  styleUrl: './dynamic-dashboard.component.css'
})
export class DynamicDashboardComponent {

  displayedColumns = ['id', 'firstName', 'lastName', 'email', 'role'];

  // 🔹 Signals (state)
  users = signal<User[]>([]);
  totalRecords = signal(0);
  loading = signal(false);

  pageIndex = signal(0);
  pageSize = signal(5);
  @ViewChild('userFormTpl', { static: true })
  userFormTpl!: TemplateRef<any>;


  constructor(private api: UserApiService, private fb: FormBuilder, private dialog: MatDialog) {

    // ✅ Combine pagination signals
    combineLatest([
      toObservable(this.pageIndex),
      toObservable(this.pageSize)
    ])
      .pipe(
        tap(() => this.loading.set(true)),

        // ✅ Cancels previous HTTP automatically
        switchMap(([pageIndex, pageSize]) =>
          this.api.getDynamicUsers(pageIndex * pageSize, pageSize)
        ),

        // finalize(() => this.loading.set(false))
      )
      .subscribe(res => {
        this.users.set(res.users);
        this.totalRecords.set(res.total);
        this.loading.set(false)
      });

    // 🔥 React to dialog result
    effect(() => {
      if (this.result()) {
        console.log('Saved:', this.result());
        this.userForm.reset();
      }
    });
  }

  userForm = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    role: ['', [Validators.required]],
  });

  result = signal<any>(null);

  // 🔹 MatPaginator event
  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

  OpenModal() {
    const ref = this.dialog.open(CommonPopupComponent, {
      width: '500px',
      data: {
        title: 'Add User',
        form: this.userForm,
        mode: 'add',
        template: this.userFormTpl,

      },
    });

    ref.afterClosed().subscribe(res => this.result.set(res));
  }

}

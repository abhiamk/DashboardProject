import { Component, signal } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { PageEvent } from '@angular/material/paginator';
import { combineLatest, tap, switchMap, finalize } from 'rxjs';
import { User } from '../../user/user';
import { UserApiService } from '../../user/user-api.service';
import { toObservable } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-dynamic-dashboard',
  standalone: true,
  imports: [MaterialModule, CommonModule],
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

  constructor(private api: UserApiService) {

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
  }

  // 🔹 MatPaginator event
  onPageChange(event: PageEvent) {
    this.pageIndex.set(event.pageIndex);
    this.pageSize.set(event.pageSize);
  }

}

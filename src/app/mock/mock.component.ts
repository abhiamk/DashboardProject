import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { MaterialModule } from '../shared/material.module';
import { MockApiService } from '../API-Service/mock-api.service';
import { Inventories } from './inventories';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MockPopupComponent } from './mock-popup/mock-popup.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mock',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule],
  templateUrl: './mock.component.html',
  styleUrl: './mock.component.css'
})
export class MockComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns: string[] = ['id', 'item', 'price', 'currentCount', 'TotalCount', 'imgURL', 'actions'];
  dataSource!: MatTableDataSource<Inventories>;
  isLoading = false;
  tableDensity = 'compact-table';
  filterableColumns = ['id', 'item', 'price'];
  selectedOperator = 'contains';
  filterValue = '';
  matPages = [10, 25, 50, 100];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  matDialogRef?: MatDialogRef<MockPopupComponent>;

  private destroy$ = new Subject<void>();

  constructor(private mock: MockApiService, private matDialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getMockData();
  }

  ngAfterViewInit() {
    if (this.dataSource) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }

  getMockData() {
    this.isLoading = true;

    this.mock.getMockInventories()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data: Inventories[]) => {
          this.dataSource = new MatTableDataSource(data);
          // wire paginator & sort after dataSource created
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          this.isLoading = false;
        },
        error: (err) => {
          this.isLoading = false;
          this.dataSource = new MatTableDataSource([]);
          alert(err);
        }
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  OpenModal() {
    this.matDialogRef = this.matDialog.open(MockPopupComponent, {
      data: {},
      width: '600px',
    });

    this.matDialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (res === true) {
          this.getMockData();
        }
      });
  }

  editRow(item: Inventories) {
    this.matDialogRef = this.matDialog.open(MockPopupComponent, {
      data: item,
      width: '600px',
    });

    this.matDialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe(res => {
        if (res === true) {
          this.getMockData();
        }
      });
  }

  deleteRow(item: Inventories) {

    const isConfirmed = confirm(`Are you sure you want to delete "${item.item}"?`);

    if (!isConfirmed) return;

    this.mock.deleteMockInventories(item)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.getMockData();
          alert(`${item.item} deleted successfully`);
        },
        error: (err) => alert(err)
      });
  }

  detailRow(item) {
    this.router.navigate(['/mock', item.id]);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

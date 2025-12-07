import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButton } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { MaterialModule } from '../../shared/material.module';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DynamicPopupComponent } from './dynamic-popup/dynamic-popup.component';
import { UserFormComponent } from './user-form/user-form.component';


export interface PeriodicElement {
  name: string,
  id: number,
  progress: number,
  symbol: string,
  symbol1: string,
  symbol2: string,
}

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, name: 'Hydrogen', progress: 1.0079, symbol: 'H', symbol1: '', symbol2: '' },
  { id: 2, name: 'Helium', progress: 4.0026, symbol: 'He', symbol1: '', symbol2: '' },
  { id: 3, name: 'Lithium', progress: 6.941, symbol: 'Li', symbol1: '', symbol2: '' },
  { id: 4, name: 'Beryllium', progress: 9.0122, symbol: 'Be', symbol1: '', symbol2: '' },
  { id: 5, name: 'Boron', progress: 10.811, symbol: 'B', symbol1: '', symbol2: '' },
  { id: 6, name: 'Carbon', progress: 12.0107, symbol: 'C', symbol1: '', symbol2: '' },
  { id: 7, name: 'Nitrogen', progress: 14.0067, symbol: 'N', symbol1: '', symbol2: '' },
  { id: 8, name: 'Oxygen', progress: 15.9994, symbol: 'O', symbol1: '', symbol2: '' },
  { id: 9, name: 'Fluorine', progress: 18.9984, symbol: 'F', symbol1: '', symbol2: '' },
  { id: 10, name: 'Neon', progress: 20.1797, symbol: 'Ne', symbol1: '', symbol2: '' },
];

@Component({
  selector: 'app-client-dashboard',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, DynamicPopupComponent],
  templateUrl: './client-dashboard.component.html',
  styleUrl: './client-dashboard.component.css'
})
export class ClientDashboardComponent implements AfterViewInit, OnInit {


  displayedColumns: string[] = ['id', 'name', 'progress', 'symbol', 'symbol1', 'symbol2', 'actions'];
  dataSource: MatTableDataSource<PeriodicElement>;
  tableDensity = 'compact-table';
  filterableColumns = ['id', 'progress', 'name', 'symbol'];
  selectedColumn = 'name';
  selectedOperator = 'contains';
  filterValue = '';
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  matDialogRef: MatDialogRef<DynamicPopupComponent>;
  name: string = '';
  constructor(private router: Router, private matDialog: MatDialog,
  ) {
    // Assign the data to the data source for the table to render
    this.dataSource = new MatTableDataSource(ELEMENT_DATA);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editRow(row: any): void {
    console.log('Editing row', row);
  }

  deleteRow(row: any): void {
    console.log('Deleting row', row);
  }

  deteailRow(row: any): void {
    console.log('Details row', row);
    this.router.navigateByUrl(`/details/${row.id}`);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  applyCustomFilter() {
    this.dataSource.filterPredicate = (data, filter) => {
      const filterObj = JSON.parse(filter);
      const value = data[filterObj.column];

      switch (filterObj.operator) {
        case 'equals':
          return value == filterObj.value;
        case 'contains':
          return value.toString().toLowerCase().includes(filterObj.value.toLowerCase());
        case 'greater':
          return value > filterObj.value;
        case 'less':
          return value < filterObj.value;
        default:
          return true;
      }
    };

    this.dataSource.filter = JSON.stringify({
      column: this.selectedColumn,
      operator: this.selectedOperator,
      value: this.filterValue
    });
  }

  setDensity(density: string) {
    this.tableDensity = density === 'compact' ? 'compact-table' : 'standard-table';
  }

  OpenModal() {
    this.matDialogRef = this.matDialog.open(DynamicPopupComponent, {
      data: { name: this.name || 'Abhi' },
      height: '400px',
      width: '600px',
      // disableClose: true
    });

    this.matDialogRef.afterClosed().subscribe(res => {
      if ((res == true)) {
        this.name = "";
      }
    });
  }

}


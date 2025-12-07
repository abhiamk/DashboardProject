import { AfterViewInit, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MaterialModule } from '../../material.module';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

export interface TableColumn {
  key: string; // property name in row data
  label: string; // column header text
  sortable?: boolean; // allow sorting
  width?: string; // optional CSS width (eg '120px')
  cell?: (row: any) => string; // optional formatter
}


export interface TableAction {
  name: string; // action id (eg 'edit', 'delete', 'view')
  label?: string; // tooltip / menu text
  icon?: string; // material icon name
  showIf?: (row: any) => boolean; // optional predicate to show action for a row
}


@Component({
  selector: 'app-mat-table',
  standalone: true,
  imports: [MaterialModule, CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './mat-table.component.html',
  styleUrl: './mat-table.component.css'
})
export class MatTableComponent implements AfterViewInit, OnChanges {
  @Input() columns: TableColumn[] = []; // visible columns definition
  @Input() data: any[] = []; // array of rows
  @Input() displayActions = true; // whether to show action column
  @Input() actions: TableAction[] = [ // default common actions
    { name: 'edit', label: 'Edit', icon: 'edit' },
    { name: 'delete', label: 'Delete', icon: 'delete' }
  ];
  @Input() pageSizeOptions: number[] = [5, 10, 25];
  @Input() pageSize = 10;
  @Input() filterPlaceholder = 'Filter';
  @Input() showSearch = true;

  @Output() action = new EventEmitter<{ action: string; row: any }>();
  @Output() rowClick = new EventEmitter<any>();


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  dataSource = new MatTableDataSource<any>([]);
  displayedColumns: string[] = [];


  ngOnChanges(changes: SimpleChanges) {
    if (changes['data']) {
      this.dataSource.data = this.data || [];
      this.resetPagingIfNeeded();
    }
    this.displayedColumns = this.columns.map(c => c.key);
    if (this.displayActions) this.displayedColumns.push('actions');
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(value: string) {
    const filterValue = (value || '').trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }


  emitAction(actionName: string, row: any) {
    this.action.emit({ action: actionName, row });
  }


  onRowClick(row: any) {
    this.rowClick.emit(row);
  }


  private resetPagingIfNeeded() {
    if (this.paginator) this.paginator.firstPage();
  }

}

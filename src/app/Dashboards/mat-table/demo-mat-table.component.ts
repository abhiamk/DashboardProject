import { Component } from '@angular/core';
import { MaterialModule } from '../../shared/material.module';
import { MatTableComponent, TableColumn } from '../../shared/CommonComponent/mat-table/mat-table.component';

@Component({
  selector: 'demo-app-mat-table',
  standalone: true,
  imports: [MatTableComponent, MaterialModule],
  templateUrl: './demo-mat-table.component.html',
  styleUrl: './demo-mat-table.component.css'
})
export class DemoMatTableComponent {
  search = true;
  columns: TableColumn[] = [
    { key: 'id', label: 'ID', sortable: true },
    { key: 'name', label: 'Name', sortable: true },
    { key: 'email', label: 'Email', sortable: true }
  ];

  rows = [
    { id: 1, name: 'Abhi', email: 'abhi@example.com' },
    { id: 2, name: 'Sanjay', email: 'sanjay@example.com' }
  ];


  onTableAction(e: { action: string; row: any }) {
    if (e.action === 'edit') { /* open edit dialog */ }
    if (e.action === 'delete') { /* confirm and delete */ }
  }

  onRowClicked(row: any) {
    console.log("Row clicked:", row);
    // Do whatever you need: open details, sidebar, popup, etc.
  }
}

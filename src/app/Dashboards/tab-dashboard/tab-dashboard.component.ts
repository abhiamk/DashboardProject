import { Component, OnInit, signal } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { ClientDashboardComponent } from '../client-dashboard/client-dashboard.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { TabService } from '../tab.service';
import { EmpDashboardComponent } from '../emp-dashboard/emp-dashboard.component';

@Component({
  selector: 'app-tab-dashboard',
  standalone: true,
  imports: [CommonModule, MatTabsModule, ClientDashboardComponent, DashboardComponent, EmpDashboardComponent],
  templateUrl: './tab-dashboard.component.html',
  styleUrl: './tab-dashboard.component.css'
})
export class TabDashboardComponent implements OnInit {
  activeTabIndex: any;
  constructor(private tabService: TabService) { }

  ngOnInit(): void {
    this.activeTabIndexs();
  }

  activeTabIndexs() {
    this.activeTabIndex = this.tabService.getActiveTabIndex();
  }

  onTabChange(event: any) {
    this.tabService.setActiveTabIndex(event.index);
  }

}

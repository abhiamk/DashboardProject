import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TabService {
  private activeTabIndex = signal(0);  // Default value is 0 (first tab)

  // Provide the signal itself for components to read directly
  getActiveTabIndex() {
    return this.activeTabIndex;
  }

  // Method to update the active tab index
  setActiveTabIndex(index: number) {
    this.activeTabIndex.set(index);  // Update the active tab index value
  }
}

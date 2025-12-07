import { Component, effect, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SidebarService } from '../../../sidebar/sidebar.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() isToggle = new EventEmitter();
  currentDate: string = '';
  currentTime: string = '';
  intervalId: any;
  @Input() isToggled: any

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.updateDateTime();
    this.intervalId = setInterval(() => {
      this.updateDateTime();
    }, 1000); // Update every second
  }

  updateDateTime(): void {
    const now = new Date();
    this.currentDate = now.toLocaleDateString();
    this.currentTime = now.toLocaleTimeString();
  }

  toggleSidebar() {
    this.isToggle.emit();
  }

  logout() {
    localStorage.clear();
    this.router.navigateByUrl('/');
    // window.location.reload();
  }
  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Clean up the interval when the component is destroyed
    }
  }
}

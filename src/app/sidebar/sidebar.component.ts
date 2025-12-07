import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { SidebarService } from './sidebar.service';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  animations: [
    trigger('slide', [
      state('up', style({ height: 0 })),
      state('down', style({ height: '*' })),
      transition('up <=> down', animate(200))
    ])
  ]
})
export class SidebarComponent {
  searchTerm: string = '';

  menus = [];
  temp = [];
  @Output() isToggle = new EventEmitter();
  constructor(public sidebarservice: SidebarService) {
    this.menus = sidebarservice.getMenuList();
    this.temp = sidebarservice.getMenuList();
  }

  ngOnInit() {
  }


  searchMenu(event: Event) {
    const query = (event.target as HTMLInputElement).value.toLowerCase();
    this.menus = this.temp
      .map(menu => ({
        ...menu,
        submenus: menu.submenus?.filter(submenu =>
          submenu.title.toLowerCase().includes(query)
        ) || []  // Ensure submenus is always an array
      }))
      .filter(menu => menu.submenus.length > 0 || menu.title.toLowerCase().includes(query));
  }



  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  }

  toggleSidebar() {
    this.isToggle.emit();
  }

  toggle(currentMenu) {
    if (currentMenu.type === 'dropdown') {
      this.menus.forEach(element => {
        if (element === currentMenu) {
          currentMenu.active = !currentMenu.active;
        } else {
          element.active = false;
        }
      });
    }
  }

  getState(currentMenu) {

    if (currentMenu.active) {
      return 'down';
    } else {
      return 'up';
    }
  }

  hasBackgroundImage() {
    return this.sidebarservice.hasBackgroundImage;
  }


}

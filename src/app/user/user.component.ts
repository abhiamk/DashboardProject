import { Component, computed, effect, Inject } from '@angular/core';
import { UserApiService } from './user-api.service';
import { UserService } from './user.service';
import { User } from './user';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  // userService = Inject(UserService);
  form = { name: '', email: '', address: '', exp: 0, id: '' } as User;

  constructor(
    public userService: UserService,
    // public utils: InventoryUtilsService
  ) {
    // auto-update form when selected item changes

    effect(() => {
      const sel = this.userService.selected();
      this.form = sel ? { ...sel } : { name: '', email: '', address: '', exp: 0, id: '' };
    });

        // reset form after save completes (saved is a boolean signal in the store)
    effect(() => {
      if (this.userService.saved?.()) {          // optional chaining if saved may not exist
        this.form = { name: '', email: '', address: '', exp: 0, id: '' };
        this.userService.saved.set(false);      // clear the flag
      }
    });
  }

  ngOnInit(): void {
    this.userService.load();
  }

  save() {
    this.userService.save(this.form);
  }

  edit(item: User) {
    this.userService.select(item);
  }

  cancel() {
    this.userService.select(null);
  }

  remove(item: User) {
    if (item.id) this.userService.delete(item.id);
  }
}

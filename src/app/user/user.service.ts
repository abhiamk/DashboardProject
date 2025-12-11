import { Inject, Injectable, signal } from '@angular/core';
import { User } from './user';
import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  items = signal<User[]>([]);
  selected = signal<User | null>(null);
  loading = signal<boolean>(false);
  error = signal<string | null>(null);
  saved = signal(false);

  constructor(private apiService: UserApiService) { }
  load() {
    this.loading.set(true);
    this.apiService.getUser().subscribe({
      next: (list) => {
        this.items.set(list);
        this.error.set(null);
      },
      error: (err) => this.error.set(err?.message || err),
      complete: () => this.loading.set(false)
    });
  }

  select(item: User | null) {
    this.selected.set(item ? { ...item } : null);
  }

  save(item: User) {
    item.id ? this.update(item.id, item) : this.create(item);
  }

  create(item: User) {
    this.loading.set(true);
    this.apiService.createUser(item).subscribe({
      next: (created) => {
        this.items.update(list => [created, ...list]);
        this.selected.set(null);
        this.saved.set(true);
      },
      error: (err) => this.error.set(err?.message || err),
      complete: () => this.loading.set(false)
    });
  }

  update(id: string, item: User) {
    this.loading.set(true);
    this.apiService.updateUser(id, item).subscribe({
      next: (updated) => {
        this.items.update(list =>
          list.map(i => (i.id === id ? updated : i))
        );
        this.selected.set(null);
        this.saved.set(true);
      },
      error: (err) => this.error.set(err?.message || err),
      complete: () => this.loading.set(false)
    });
  }

  delete(id: string) {
    if (!confirm('Delete item?')) return;

    this.loading.set(true);
    this.apiService.deleteUser(id).subscribe({
      next: () => {
        this.items.update(list => list.filter(i => i.id !== id));
      },
      error: (err) => this.error.set(err?.message || err),
      complete: () => this.loading.set(false)
    });
  }
}

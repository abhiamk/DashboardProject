import { CommonModule } from '@angular/common';
import { Component, inject, Inject, signal } from '@angular/core';
import { UserCardComponent } from '../user-card/user-card.component';
import { SignalService, User } from '../../API-Service/signalService/signal.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-demo-signal',
  standalone: true,
  imports: [CommonModule, UserCardComponent, FormsModule],
  templateUrl: './demo-signal.component.html',
  styleUrl: './demo-signal.component.css'
})
export class DemoSignalComponent {
  signalService = inject(SignalService)
  user = this.signalService.users;
  selectedIdSignal = signal<number | null>(null);

  newName = '';
  newEmail = '';
  editing: User | null = null;

  select(id: any) {
    this.selectedIdSignal.set(id);
  }

  addUser() {
    if (!this.newName || !this.newEmail) return;
    const id = Math.max(0, ...this.user().map(u => u.id)) + 1;
    const obj = {
      id,
      name: this.newName,
      email: this.newEmail
    }
    this.signalService.addUser(obj);
    this.newName = this.newEmail = '';
  }

  openEdit(u: User) {
    this.editing = { ...u };
  }

  cancelEdit() { this.editing = null; }

  saveEdit() {
    if (!this.editing) return;
    this.signalService.updateUser(this.editing);
    this.editing = null;
  }

  confirmDelete(id: number) {
    // simple confirm
    if (confirm('Delete user?')) this.signalService.removeUser(id);
  }


}

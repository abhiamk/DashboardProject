import { Component, input, output, Signal } from '@angular/core';
import { User } from '../../API-Service/signalService/signal.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  // input signal
  user = input.required<User>();
  selectedId = input<Signal<number | null>>();

  edit = output<User>();
  delete = output<number>();
  select = output<number>();

  onEdit() { this.edit.emit(this.user()); }
  onDelete() { this.delete.emit(this.user().id); }
  onSelect() { this.select.emit(this.user().id); }  // <-- safe: TS sees .emit() on property
  isSelected(): boolean {
    const sel = this.selectedId?.()?.() ?? null;
    return sel === this.user().id;
  }
}

import { Injectable, Signal, signal } from '@angular/core';
export interface User {
  id: number;
  name: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class SignalService {
  private _users = signal<User[]>([
    { id: 1, name: 'Sanjay', email: 'sanjay@example.com' },
    { id: 2, name: 'Riya', email: 'riya@example.com' }
  ]);

  users: Signal<User[]> = this._users; //read only signal its a kind interface

  addUser(newUser: User) {
    this._users.update(pre => [...pre, newUser])
  }

  updateUser(updated: User) {
    this._users.update(pre => pre.map(u => u.id === updated.id ? updated : u));
  }

  removeUser(id: number) {
    this._users.update(pre => pre.filter(r => r.id !== id));
  }

  constructor() { }
}

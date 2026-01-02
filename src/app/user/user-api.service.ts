import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private base = 'https://68a559122a3deed2960d23c4.mockapi.io/users';
  private baseUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) { }


  getDynamicUsers(skip: number, limit: number): Observable<any> {
    const params = new HttpParams()
      .set('skip', skip)
      .set('limit', limit);

    return this.http.get<any>(this.baseUrl, { params });
  }

  getUser(): Observable<User[]> {
    return this.http.get<User[]>(this.base);
  }


  getUserById(id: string): Observable<User> {
    return this.http.get<User>(`${this.base}/${id}`);
  }


  createUser(item: User): Observable<User> {
    return this.http.post<User>(this.base, item);
  }


  updateUser(id: string, item: User): Observable<User> {
    return this.http.put<User>(`${this.base}/${id}`, item);
  }


  deleteUser(id: string): Observable<void> {
    return this.http.delete<void>(`${this.base}/${id}`);
  }
}

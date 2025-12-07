import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, forkJoin, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  redirectUrl: any;
  constructor(private http: HttpClient) { }
  private postsUrl = 'https://jsonplaceholder.typicode.com/posts';
  private usersUrl = 'https://jsonplaceholder.typicode.com/users';

  // --- forkJoin approach (RxJS) ---
  getDataWithForkJoin() {
    const posts$ = this.http.get(this.postsUrl).pipe(
      catchError(err => of({ __error: true, source: 'posts', error: err })) // swallow error -> safe value
    );
    const users$ = this.http.get(this.usersUrl).pipe(
      catchError(err => of({ __error: true, source: 'users', error: err }))
    );
    // use object form so results have named keys
    return forkJoin({ posts: posts$, users: users$ });
    // subscriber will always get an object {posts: .., users: ..}
  }

  getTodos(): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/todos')
  }

  getCurrentUserToken() {
    let data = localStorage.getItem('currentUser');
    if (data == null || data == undefined)
      return null;
    else
      return JSON.parse(data);
  }

}

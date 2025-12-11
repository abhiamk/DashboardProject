import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Inventories } from '../mock/inventories';
@Injectable({
  providedIn: 'root'
})
export class MockApiService {

  constructor(private http: HttpClient) { }

  getMockInventories(): Observable<Inventories[]> {
    return this.http.get<Inventories[]>(`${environment.API_URL}inventories`);
  }

  getMockInventoriesById(id:number): Observable<Inventories> {
    return this.http.get<Inventories>(`${environment.API_URL}inventories/${id}`);
  }

  postMockInventories(item: Inventories): Observable<Inventories> {
    return this.http.post<Inventories>(`${environment.API_URL}inventories`, item);
  }

  putMockInventories(obj: Inventories, item: Inventories): Observable<Inventories> {
    return this.http.put<Inventories>(`${environment.API_URL}inventories/${obj.id}`, item);
  }

  deleteMockInventories(obj: Inventories): Observable<Inventories> {
    return this.http.delete<Inventories>(`${environment.API_URL}inventories/${obj.id}`);
  }

  getMockProduct(
    limit: number,
    skip: number,
    select: string,
    sortBy: string,
    order: string
  ): Observable<any> {

    const params = new HttpParams()
      .set('limit', limit)
      .set('skip', skip)
      .set('select', select)
      .set('sortBy', sortBy)
      .set('order', order);
    return this.http.get<any>('https://dummyjson.com/products', { params });
  }

}

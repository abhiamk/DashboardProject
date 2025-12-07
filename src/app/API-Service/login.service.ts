import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { FkLoginRequest, FkLoginResponse, LoginRequest, LoginResponse } from '../Interfaces/login';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  login(obj: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${environment.login_url}login`, obj);
  }

  fkLogin(obj: FkLoginRequest): Observable<FkLoginResponse> {
    return this.http.post<FkLoginResponse>(`${environment.login_url}login`, obj);
  }

}

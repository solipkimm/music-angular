import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from './../environments/environment';
//import { tap } from "rxjs/operators";

import { JwtHelperService } from '@auth0/angular-jwt';

const helper = new JwtHelperService();

import {User} from './User';
import {RegisterUser} from './RegisterUser';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor( 
    private http: HttpClient,
    private jwtHelper: JwtHelperService
  ) { }

  public getToken(): string {
    return localStorage.getItem('access_token');
  }

  public readToken(): User {
    const token = localStorage.getItem('access_token');
    return this.jwtHelper.decodeToken(token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    
    if (token){
      console.log('token exists');
      return true;
    } else {
      console.log('no token');
      return false;
    }
  }

  login(user: User): Observable<any> {
    const url = `${environment.userAPIBase}/login`;
    return this.http.post<any>(url, user);
    //.pipe(
    //  tap(data => data.token && localStorage.setItem('access_token', data.token))
    //);
  }

  logout(): void {
    localStorage.removeItem('access_token');
  }

  register(registerUser: RegisterUser): Observable<any> {
    const url = `${environment.userAPIBase}/register`;
    return this.http.post<any>(url, registerUser);
  }

}
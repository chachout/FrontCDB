import { Injectable } from '@angular/core';
import {User} from '../model/User.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceLogin {

  

  baseUrl = 'http://localhost:8080/webModule';
  
  constructor(private http: HttpClient) { }

  getUser(user: User): Observable<User> {
    return this.http.post<User>(this.baseUrl + '/login',user);
  }

  estUserOrAdmin(): boolean {

    // tslint:disable-next-line:triple-equals
    if ( sessionStorage.getItem('role') == 'ROLE_USER' || sessionStorage.getItem('role') == 'ROLE_ADMIN') {
      return true;
    } 
      return false;
  
  }
  estAdmin(): boolean {

    // tslint:disable-next-line:triple-equals
    if ( sessionStorage.getItem('role') == 'ROLE_ADMIN') {
      return true;
    } else {
      return false;
    }
  }
  estConnecte(): boolean {
    // tslint:disable-next-line:max-line-length
    if ( sessionStorage.getItem('username') != null && sessionStorage.getItem('password') != null && sessionStorage.getItem('role') != null ) {
      return true;
    } else {
      return false;
    }
  }
  seDeconnecter() {
    sessionStorage.clear();
    
  }


}

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServiceMessagerie {

  

  baseUrl = 'http://localhost:8080/';
  
  constructor(private http: HttpClient) { }

 

}

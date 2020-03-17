import { Injectable } from '@angular/core';
import {Computer} from '../model/computer.model';
import {Company} from '../model/company.model';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  baseURL = 'http://localhost:8080/webModule';
  
  constructor(private http: HttpClient) { }

  getComputers(): Observable<Computer[]> {
    return this.http.get<Computer[]>(this.baseURL+'/computers');
  }
  getComputer(id: string): Observable<Computer> {
    return this.http.get<Computer>(this.baseURL+'/computer?id=' + id);
  }
  addComputer(computer: Computer): Observable<string>  {
    return this.http.post<string>(this.baseURL+'/addComputer', computer);
  }
  deleteComputer(idlist: string): Observable<void> {
    return this.http.delete<void>(this.baseURL+'/computers/' + idlist);
  }
  updateComputer(computer: Computer): Observable<Computer> {
    return this.http.patch<Computer>(this.baseURL+'/editComputer', computer);
  }
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseURL+'/companies');
  }
  sortBy(field: string): Observable<Computer[]> {
    return this.http.get<Computer[]>(this.baseURL+'/computers?orderBy='+field);
  }
  search(searchBox: string):Observable<Computer[]> {
    return this.http.get<Computer[]>(this.baseURL+'/computers?search='+searchBox);
  }
}

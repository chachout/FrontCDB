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

  getComputers(taillePage:any,pageIterator: any): Observable<Computer[]> {
    return this.http.get<Computer[]>(this.baseURL+'/computers?taillePage='+taillePage+'&pageIterator='+pageIterator);
  }
  getComputer(id: string): Observable<Computer> {
    return this.http.get<Computer>(this.baseURL+'/computer?id=' + id);
  }
  addComputer(computer: Computer): Observable<any>  {
    return this.http.post<any>(this.baseURL+'/addComputer', computer);
  }
  deleteComputer(idlist: string): Observable<void> {
    console.log(idlist);
    return this.http.post<void>(this.baseURL+'/computers/',{'selection':idlist} );
  }
  updateComputer(computer: Computer): Observable<Computer> {
    return this.http.patch<Computer>(this.baseURL+'/editComputer', computer);
  }
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>(this.baseURL+'/companies');
  }
  sortBy(field: string,taillePage:any): Observable<Computer[]> {
    return this.http.get<Computer[]>(this.baseURL+'/computers?orderBy='+field+'&taillePage='+taillePage);
  }
  search(searchBox: string):Observable<Computer[]> {
    return this.http.get<Computer[]>(this.baseURL+'/computers?search='+searchBox);
  }
  getNumberOfComputers(): Observable<Number>{
    return this.http.get<Number>(this.baseURL+'/computers/size');
  }
}

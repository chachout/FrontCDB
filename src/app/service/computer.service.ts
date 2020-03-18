import { Injectable } from '@angular/core';
import {Computer} from '../model/computer.model';
import {Company} from '../model/company.model';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ComputerService {

  constructor(private http: HttpClient) { }

  getComputers(): Observable<Computer[]> {
    return this.http.get<Computer[]>('http://localhost:8080/webModule/computers');
  }
  getComputer(id: string): Observable<Computer> {
    return this.http.get<Computer>('http://localhost:8080/webModule/computer?id=' + id);
  }
  addComputer(computer: Computer): Observable<string>  {
    return this.http.post<string>('http://localhost:8080/webModule/addComputer', computer);
  }
  deleteComputer(selection: string): Observable<void> {
    return this.http.post<void>('http://localhost:8080/webModule/computers', selection);
  }
  updateComputer(computer: Computer): Observable<Computer> {
    return this.http.patch<Computer>('http://localhost:8080/webModule/editComputer', computer);
  }
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('http://localhost:8080/webModule/companies');
  }
}

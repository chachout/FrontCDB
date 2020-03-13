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
    return this.http.get<Computer[]>('http://10.0.1.154:8080/webModule/computers');
  }
  getComputer(id: string): Observable<Computer> {
    return this.http.get<Computer>('http://10.0.1.154:8080/webModule/computer?id=' + id);
  }
  addComputer(computer: Computer): Observable<string>  {
    return this.http.post<string>('http://10.0.1.154:8080/webModule/addComputer', computer);
  }
  deleteComputer(idlist: string): Observable<void> {
    return this.http.delete<void>('http://10.0.1.154:8080/webModule/computers/' + idlist);
  }
  updateComputer(computer: Computer): Observable<Computer> {
    return this.http.patch<Computer>('http://10.0.1.154:8080/webModule/editComputer', computer);
  }
  getCompanies(): Observable<Company[]> {
    return this.http.get<Company[]>('http://10.0.1.154:8080/webModule/companies');
  }
}

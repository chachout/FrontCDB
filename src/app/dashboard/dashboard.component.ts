import {Component, OnInit, Input} from '@angular/core';
import {ComputerService} from '../service/computer.service';
import {Computer} from '../model/computer.model';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  computerList: Computer[];
  addMode = false;
  searchBox: any ;
  constructor(private computerService: ComputerService) { }

  ngOnInit() {
    this.searchBox = '';
    this.getComputerLIst();
  }

  getComputerLIst(){
    this.computerService.getComputers().subscribe(computerList => this.computerList = computerList, error => console.log(error));
  }

  supprimer(idList: string) {
    this.computerService.deleteComputer(idList).subscribe();
  }

  sort(field:string){
    console.log(field);
    this.computerService.sortBy(field).subscribe(computerList => this.computerList = computerList, error => console.log(error));
  }

  search(){
    this.computerService.search(this.searchBox).subscribe(computerList => this.computerList = computerList, error => console.log(error));
  }
}

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
  pageIterator:any;
  size:any;
  taillePage:any;
  constructor(private computerService: ComputerService) { }

  ngOnInit() {
    this.taillePage = 20;
    this.pageIterator = 0;
    this.getComputerLIst(this.taillePage,this.pageIterator);
    this.searchBox = '';
    this.size=0;
    this.taillePage = 20;
  }

  getComputerLIst(taillePage:any,pageIterator:any){
    this.computerService.getComputers(taillePage,pageIterator).subscribe(computerList => this.computerList = computerList, error => console.log(error));
    this.numberOfComputers();
  }

  supprimer(idList: string) {
    if(confirm("voulez-vous vraiment supprimer cet ordinateur?")) {
      this.computerService.deleteComputer(idList).subscribe(()=>
      {
        this.getComputerLIst(this.taillePage,this.pageIterator);
      }
      );
    }
  }

  sort(field:string,taillePage:any){
    this.computerService.sortBy(field,taillePage).subscribe(computerList => this.computerList = computerList, error => console.log(error));
    this.numberOfComputers();
  }

  search(){
    this.pageIterator=0;
    this.computerService.search(this.searchBox).subscribe(computerList => this.computerList = computerList, error => console.log(error));
    this.size=this.computerList .length;
  }

  estDernierePage():boolean{
    if((this.pageIterator == this.size/this.taillePage) || (this.pageIterator+1 > this.size/this.taillePage) ){
      return true;
    }else{
      return false;
    }
  }
  estPremierePage():boolean{
    if(this.pageIterator==0){
      return true;
    }
    return false;
  }

  cinqsElements():Number[]{
    const list = new Array(1,2,3,4);
    return list;
  }
  numberOfComputers(){
    this.computerService.getNumberOfComputers().subscribe(size => this.size = size, error => console.log() ) 
  }

  avancerPage(){
    this.pageIterator++;
    this.getComputerLIst(this.taillePage,this.pageIterator);
    
  }
  allerALaPage(i:any){
    this.pageIterator=i;
    this.getComputerLIst(this.taillePage,this.pageIterator);

  }
  retournerPage(){
    this.pageIterator--;
    this.getComputerLIst(this.taillePage,this.pageIterator);
  }
}

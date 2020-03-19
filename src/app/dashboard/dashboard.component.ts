import {Component, OnInit, Input} from '@angular/core';
import {ComputerService} from '../service/computer.service';
import {Computer} from '../model/computer.model';
import {ActivatedRoute, Router} from '@angular/router';
import { ServiceLogin } from '../service/login-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  computerList: Computer[];
  addMode = false;
  searchMode:boolean;
  searchBox: string ;
  pageIterator:any;
  size:any;
  taillePage:any;
  orderBy="";
  constructor(private computerService: ComputerService, public loginService: ServiceLogin ) { }

  ngOnInit() {
    this.searchMode=false;
    this.taillePage = 5;
    this.pageIterator = 1;
    this.getComputerLIst();
    this.searchBox = '';
    this.size=0;
    this.orderBy="";
  }


  getComputerLIst(){
    this.initialiserIterationPourListe();
    if(this.orderBy==""){
      this.computerService.getComputers(this.taillePage,this.pageIterator-1).subscribe(computerList => this.computerList = computerList, error => console.log(error));
    }
    else{
      this.sort(this.orderBy);
    }
    this.numberOfComputers();
    this.afficherTouteLaListe();
  }
  afficherTouteLaListe(){
    this.searchMode=false;
    this.searchBox="";
  }

  supprimer(idList: string) {
    if(confirm("voulez-vous vraiment supprimer cet ordinateur?")) {
      this.computerService.deleteComputer(idList).subscribe(()=>
      {
        this.getComputerLIst();
      }
      );
    }
  }
  normalSort(){
    this.orderBy="";
    if(this.searchMode==true){
      this.search();
    }else{
      this.getComputerLIst();
    }
  }
  sort(field:string){
    this.orderBy=field
    if(this.searchMode==false){
      this.computerService.sortBy(this.taillePage,this.pageIterator-1,field).subscribe(computerList => this.computerList = computerList, error => console.log(error));
      this.numberOfComputers();
    }
    else{
      this.computerService.sortSearchBy(this.taillePage,this.pageIterator-1,this.searchBox,field).subscribe(computerList => this.computerList = computerList, error => console.log(error));
    }

  }
  initialiserIterationPourSearch(){
  if(this.searchMode==false){
    this.pageIterator=1;
    }
  }
  initialiserIterationPourListe(){
    if(this.searchMode==true){
      this.pageIterator=1;
      }
    }
  search(){
    if(this.searchBox.trim()!=""){
      this.initialiserIterationPourSearch();
      if(this.orderBy==""){
         this.computerService.search(this.taillePage,this.pageIterator,this.searchBox).subscribe(computerList => this.computerList = computerList, error => console.log(error));
      }
      else{
        this.sort(this.orderBy);
      }
     this.computerService.sizeSearch(this.searchBox).subscribe((size)=>this.size=size);
      this.searchMode = true;
    }

  }

  estDernierePage():boolean{
    if((this.pageIterator == this.size/this.taillePage) || (this.pageIterator+1 > this.size/this.taillePage) ){
      return true;
    }else{
      return false;
    }
  }
  estPremierePage():boolean{
    if(this.pageIterator==1){
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
    if(this.searchMode ==false){
      this.getComputerLIst();

    }
    else{
      this.search();
    }

  }
  allerALaPage(i:any){
    this.pageIterator=i;
    if(this.searchMode ==false){
      this.getComputerLIst();

    }
    else{
      this.search();
    }

  }
  retournerPage(){
    this.pageIterator--;
   if(this.searchMode ==false){
      this.getComputerLIst();

    }
    else{
      this.search();
    }
  }
}

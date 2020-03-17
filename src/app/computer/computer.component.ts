import { Component, OnInit } from '@angular/core';
import { Computer } from '../model/computer.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ComputerService } from '../service/computer.service';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent implements OnInit {

  computer: Computer;
  id:any;
  constructor(private route: ActivatedRoute, private computerService: ComputerService, private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    this.computerService.getComputer(this.id).subscribe(computer => this.computer = computer, error => console.log(error));

  }
  otherCase(): boolean{
    if(this.computer.id%2!=0  && this.computer.id%4!=0 && this.computer.id%6!=0){
      return true;
    }
    return false
  }

}

import { Component, OnInit } from '@angular/core';
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

  constructor(private computerService: ComputerService) { }

  ngOnInit() {
    this.computerService.getComputers().subscribe(computerList => this.computerList = computerList, error => console.log(error));
  }

}

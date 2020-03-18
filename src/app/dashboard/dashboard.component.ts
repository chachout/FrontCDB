import {Component, OnInit, Output, EventEmitter,  Input} from '@angular/core';
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
  constructor(private computerService: ComputerService, private router: Router) { }

  ngOnInit() {
    this.computerService.getComputers().subscribe(computerList => this.computerList = computerList, error => console.log(error));
  }
  supprimer(computer: Computer) {
    const index = this.computerList.indexOf(computer);
    this.computerList.splice(index, 1);
    this.computerService.deleteComputer(computer.id.toString()).subscribe(() => this.router.navigate(['/dashboard']));
  }
}

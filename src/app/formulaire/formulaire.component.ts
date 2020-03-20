import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Computer} from '../model/computer.model';
import {FormControl, FormGroup} from '@angular/forms';
import {ComputerService} from '../service/computer.service';
import {Company} from '../model/company.model';
import { ServiceLogin } from '../service/login-service';

@Component({
  selector: 'app-formulaire',
  templateUrl: './formulaire.component.html',
  styleUrls: ['./formulaire.component.scss']
})
export class FormulaireComponent implements OnInit {
  addMode: string;
  idEdit: string;
  companyList: Company[];
  computer: Computer;
  computerToEdit: Computer;
  computerForm: FormGroup;
  errors: any;
  constructor(private route: ActivatedRoute, private computerService: ComputerService, private router: Router,
    public loginService: ServiceLogin) {
  }

  
  ngOnInit(): void {
    this.addMode = this.route.snapshot.paramMap.get('addMode');
    this.idEdit = this.route.snapshot.paramMap.get('id');
    this.computerService.getCompanies().subscribe(companyList => this.companyList = companyList, error => console.log(error));
    this.computerService.getComputer(this.idEdit).subscribe(computerToEdit => this.computerToEdit = computerToEdit, error => console.log(error));
    this.computerForm = new FormGroup({
      name: new FormControl(),
      introduced: new FormControl(),
      discontinued: new FormControl(),
      companyId: new FormControl()
    });
  }
  addEditComputer() {
    this.computer= new  Computer();
    this.computer.company=new Company();

    this.computer.name = this.computerForm.get('name').value;
    this.computer.introduced = this.computerForm.get('introduced').value;
    this.computer.discontinued = this.computerForm.get('discontinued').value;
    this.computer.company.id = this.computerForm.get('companyId').value;
    if (this.addMode === 'true') {
      this.computerService.addComputer(this.computer).subscribe((res) =>{
        this.errors = res;
          if(this.errors.nameError!=null){
            this.errors=this.errors.nameError;
          }
          else if(this.errors.dateError!=null){
            this.errors=this.errors.dateError;
          }
          else{
            this.router.navigate(['/dashboard'])}
          }
          );
    } else if (this.addMode === 'false') {
      this.computerToEdit.company={'id':this.computerForm.get('companyId').value, 'name':''};
      console.log(this.computerToEdit);
      this.computerService.updateComputer(this.computerToEdit).subscribe((error) => {
      this.router.navigate(['/dashboard'])
      }
      );
    }
  }
}

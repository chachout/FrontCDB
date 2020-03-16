import { Component, OnInit } from '@angular/core';
import {User} from '../model/User.model';
import {FormControl, FormGroup} from '@angular/forms';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ServiceLogin} from '../service/login-service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  userConnected: User;
  constructor(private loginService: ServiceLogin, private router: Router ) { }

  ngOnInit(): void {
    // tslint:disable-next-line:no-unused-expression
    this.user = new User();
    this.loginForm = new FormGroup({
      username: new FormControl(),
      password: new FormControl()
    });
  }
  login() {
    this.user.username = this.loginForm.get('username').value;
    this.user.password = this.loginForm.get('password').value;
    this.seConnecter(this.user);
  }
  seConnecter(user: User) {
    // tslint:disable-next-line:no-shadowed-variable
    this.loginService.getUser(user).subscribe(user => {
      this.userConnected = user;
      console.log(this.userConnected);
      // @ts-ignore
      sessionStorage.setItem( 'username' , this.userConnected.username );
      sessionStorage.setItem( 'password' , this.userConnected.password );
      sessionStorage.setItem( 'role' , this.userConnected.role );
    }, error => console.log(error)) ;
  }


}

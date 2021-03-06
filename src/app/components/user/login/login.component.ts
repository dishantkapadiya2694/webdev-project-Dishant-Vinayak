import { Component, OnInit, ViewChild } from '@angular/core';
import {NgForm} from '@angular/forms';
import { UserService} from '../../../services/user.service.client';
import {Router} from '@angular/router';
import {Title} from '@angular/platform-browser';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    @ViewChild('f') loginForm: NgForm;
    email: string;
    password: string;
    errorFlag: boolean;
    errorMsg = 'Invalid credentials!';

  constructor(private router: Router, private userService: UserService, private titleService: Title) { }

  ngOnInit() {
      this.titleService.setTitle('Login');
  }

  login() {
      this.email = this.loginForm.value.email;
      this.password = this.loginForm.value.password;
      this.userService.login(this.email, this.password)
          .subscribe(
              (user: any) => {
                  this.errorFlag = false;
                  if(user['role'] === 'admin') {
                      this.router.navigate(['/admin']);
                  }
                  else if(user['role'] === 'moderator') {
                      this.router.navigate(['/moderator']);
                  } else {
                      this.router.navigate(['/home']);
                  }
              },
              (error: any) => {
                  this.errorFlag = true;
                  console.log(error);
              }
          );
  }

}

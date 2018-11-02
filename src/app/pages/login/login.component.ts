import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private route: Router, private usersService: UsersService) {}

  ngOnInit() {
    this.checkLog();
  }

  /**
   * will save data in locale storage and navigate form home if logged.
   * @param form data to pass in the httpHeader to autheticate user.
   */
  onSubmit(form) {
    this.usersService.login(form.username, form.password).subscribe(res => {
      this.route.navigate(['/']);
    });
  }

  /**
   * will check if there is user currently logged.
   */
  checkLog() {
    if (this.usersService.isLogged) {
      this.usersService
        .getUser()
        .subscribe(data => console.log(data), err => console.log(err));
    }
  }
}

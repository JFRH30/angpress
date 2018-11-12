import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';
import { EditUserResponse } from 'src/app/models/wordpress.model';

@Component({
  selector: 'login-page',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private route: Router, private app: AppService) {}

  ngOnInit() {
    this.checkLog();
  }

  /**
   * will save data in locale storage and navigate form home if logged.
   * @param form data to pass in the httpHeader to autheticate user.
   */
  onSubmit(form) {
    this.app.wp.login(form.value.username, form.value.password).subscribe(
      data => {
        const user = <EditUserResponse>data;
        alert('Successfully registered and logged as ' + user.name);
        this.route.navigate(['/']);
      },
      err => {
        alert('Login error : ' + err.error.code);
      },
    );
  }

  /**
   * will check if there is user currently logged.
   */
  checkLog() {
    if (this.app.isLoggedIn) {
      this.app.wp.showUser().subscribe(data => console.log(data), err => console.log(err));
    }
  }
}

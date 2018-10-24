import { Component, OnInit } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(public wp: WordpressService, private route: Router) {
    if (this.wp.isLogged) {
      this.wp
        .getUser()
        .subscribe(data => console.log(data), err => console.log(err));
    }
  }

  ngOnInit() {}

  onSubmit(form) {
    this.wp.login(form.username, form.password).subscribe(res => {
      console.log(res);
      this.route.navigate(['/']);
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  user = <any>{};
  constructor(public wp: WordpressService) {
    if (this.wp.isLogged) {
      this.wp
        .getUser()
        .subscribe(data => console.log(data), err => console.log(err));
    }
  }

  ngOnInit() {}

  onSubmit() {
    this.wp
      .login(this.user.username, this.user.password)
      .subscribe(res => console.log(res));
  }
}

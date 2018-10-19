import { Component, OnInit } from '@angular/core';
import {
  WpService,
  profileEndpoint,
  userEndpoint,
  wordpressUrl,
  rest
} from 'src/app/services/wp.service';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  constructor(private wp: WpService, private http: HttpClient) {}

  ngOnInit() {}

  onSubmit(form) {
    this.wp.login(form).subscribe(res => console.log(res));
  }
}

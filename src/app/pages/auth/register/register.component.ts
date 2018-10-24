import { Component, OnInit } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private wordpress: WordpressService, private route: Router) {}

  ngOnInit() {}

  onSubmit(form) {
    this.wordpress.register(form).subscribe(res => {
      console.log(res);
      this.route.navigate(['/']);
    });
  }
}

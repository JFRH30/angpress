import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WordpressService } from 'src/app/services/wordpress.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private route: Router, private wpService: WordpressService) {}

  ngOnInit() {}

  /**
   * will save data to locale storage and navigate to home if successful.
   * @param form data used to register user.
   */
  onSubmit(form) {
    this.wpService.register(form).subscribe(data => {
      console.log(data);
      this.route.navigate(['/']);
    });
  }
}

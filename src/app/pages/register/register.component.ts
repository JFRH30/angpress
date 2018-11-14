import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private route: Router, private app: AppService) {}

  ngOnInit() {}

  /**
   * will save data to locale storage and navigate to home if successful.
   * @param form data used to register user.
   */
  onSubmit(form) {
    this.app.wp.register(form.value).subscribe(
      (data) => {
        const user = data;
        alert('Successfully registered and logged as ' + user.name);
        this.route.navigate(['/']);
      },
      (e) => this.app.errorLog(e, 'Login'),
    );
  }
}

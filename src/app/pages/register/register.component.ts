import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  constructor(private userService: UsersService, private route: Router) {}

  ngOnInit() {}

  /**
   * will save data to locale storage and navigate to home if successful.
   * @param form data used to register user.
   */
  onSubmit(form) {
    this.userService.register(form).subscribe(data => {
      console.log(data);
      this.route.navigate(['/']);
    });
  }
}

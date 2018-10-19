import { Component, OnInit } from '@angular/core';
import { WpService } from 'src/app/services/wp.service';
import { FormGroup } from '@angular/forms';
import { Chance } from 'chance';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  chance = Chance;
  constructor(private wordpress: WpService) {}

  ngOnInit() {}

  onSubmit(form) {
    console.log(form);
    this.wordpress.register(form).subscribe(res => console.log(res));
    return false;
  }
}

import { Component, OnInit } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';
import { FormGroup } from '@angular/forms';
import { Chance } from 'chance';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  chance = Chance;
  constructor(private wordpress: WordpressService) {}

  ngOnInit() {}

  onSubmit(form) {
    console.log(form);
    this.wordpress.register(form).subscribe(res => console.log(res));
    return false;
  }
}

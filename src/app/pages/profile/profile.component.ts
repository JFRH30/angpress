import { Component, OnInit } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user;
  constructor(public wp: WordpressService) {}

  ngOnInit() {
    this.user = this.wp.getSavedInLocale;
  }

  onSubmit(dssd) {}
}

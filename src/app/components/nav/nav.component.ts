import { Component, OnInit } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  username;

  menus = [{ path: '/', name: 'Home' }, { path: '/forum', name: 'Forum' }];

  constructor(public wp: WordpressService) {}

  ngOnInit() {
    if (this.wp.isLogged) {
      this.username = this.wp.getUsername;
    }
  }
}

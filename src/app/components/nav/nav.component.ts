import { Component, DoCheck } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements DoCheck {
  displayName;
  menus = [{ path: '/', name: 'Home' }, { path: '/forum', name: 'Forum' }];

  constructor(public wp: WordpressService, private route: Router) {}

  ngDoCheck() {
    if (this.wp.isLogged) {
      this.displayName = this.wp.getNickname;
    }
  }

  loggedOut() {
    this.wp.logout();
    this.route.navigate(['/']);
  }
}

import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Output()
  menuClick = new EventEmitter<void>();

  constructor(public usersService: UsersService, public router: Router) {}

  ngOnInit() {}

  /**
   * will logout user.
   */
  onLoggedOut() {
    this.usersService.logout();
    this.router.navigate(['/']);
  }

  /**
   * fired whenever menu is clicked.
   */
  onMenuClicked() {
    this.menuClick.emit();
  }
}

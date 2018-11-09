import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Output()
  menuClick = new EventEmitter<void>();

  constructor(private router: Router, public app: AppService) {}

  ngOnInit() {}

  /**
   * will logout user.
   */
  onLoggedOut() {
    this.app.wp.logout();
    alert('Successfully logged out.');
    this.router.navigate(['/']);
  }

  /**
   * fired whenever menu is clicked.
   */
  onMenuClicked() {
    this.menuClick.emit();
  }
}

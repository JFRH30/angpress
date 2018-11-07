import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { WordpressService } from 'src/app/services/wordpress.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit {
  @Output()
  menuClick = new EventEmitter<void>();

  constructor(private router: Router, public wpService: WordpressService) {}

  ngOnInit() {}

  /**
   * will logout user.
   */
  onLoggedOut() {
    this.wpService.logout();
    this.router.navigate(['/']);
  }

  /**
   * fired whenever menu is clicked.
   */
  onMenuClicked() {
    this.menuClick.emit();
  }
}

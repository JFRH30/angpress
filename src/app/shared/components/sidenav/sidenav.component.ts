import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'sidenav-component',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent implements OnInit {
  @Output() routed = new EventEmitter();
  constructor(public app: AppService) {}

  ngOnInit() {}

  onNavigate() {
    this.routed.emit();
  }
}

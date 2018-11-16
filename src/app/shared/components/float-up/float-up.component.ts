import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'float-up-component',
  templateUrl: './float-up.component.html',
  styleUrls: ['./float-up.component.scss'],
})
export class FloatUpComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  onTop() {
    document.getElementsByTagName('mat-sidenav-content')[0].scroll({ top: 0, left: 0, behavior: 'smooth' });
  }
}

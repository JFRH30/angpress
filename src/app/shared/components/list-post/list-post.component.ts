import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'list-post-component',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
})
export class ListPostComponent implements OnInit, AfterViewInit {
  constructor(public app: AppService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    this.app.scrollObserver();
  }
}

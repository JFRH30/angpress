import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'contributor-component',
  templateUrl: './contributor.component.html',
  styleUrls: ['./contributor.component.scss'],
})
export class ContributorComponent implements OnInit {
  constructor(public app: AppService) {}

  ngOnInit() {
    this.app.loadContributors();
  }
}

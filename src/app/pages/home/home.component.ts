import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
@Component({
  selector: 'home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(public app: AppService) {}

  ngOnInit() {
    // to make sure to get the posts
    this.app.posts = null;
    this.app.categoryID = null;
    this.app.profileID = null;
    this.app.loadPosts();
  }
}

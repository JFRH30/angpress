import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ViewPostResponse } from 'src/app/models/wordpress.model';

@Component({
  selector: 'app-list-post',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
})
export class ListPostComponent implements OnInit {
  constructor(public app: AppService) {}

  ngOnInit() {}

  /**
   * will load users posts.
   */
  loadUserPosts() {
    const param = '?author=' + this.app.profileID + '&_embed';
    this.app.wp.showPost(param).subscribe(data => {
      this.app.profilePosts = <ViewPostResponse[]>data.body;
    });
  }
}

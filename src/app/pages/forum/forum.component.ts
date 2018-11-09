import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ActivatedRoute } from '@angular/router';
import { ViewUserResponse } from 'src/app/models/wordpress.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  users: ViewUserResponse[];

  constructor(private activatedRoute: ActivatedRoute, public app: AppService) {}
  ngOnInit() {
    this.doLoadPosts();
  }

  doLoadPosts() {
    this.activatedRoute.params.subscribe(params => {
      if (params['slug'] == null) {
        this.app.categoryID = null;
        this.app.loadPosts();
      }
      if (this.app.categories) {
        this.app.categories.filter(category => {
          if (category.slug === params['slug']) {
            this.app.categoryID = category.id;
            this.app.loadPosts();
          }
        });
      }
    });
  }

  /**
   * this will load all users who have posts or contributed.
   */
  // loadUsers() {
  //   this.app.wp.showUser().subscribe(data => {
  //     this.users = <ViewUserResponse[]>data;
  //   });
  // }
}

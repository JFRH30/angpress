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
  category = '';
  users: ViewUserResponse[];

  constructor(private activatedRoute: ActivatedRoute, public app: AppService) {}
  ngOnInit() {
    this.doLoadPosts();
  }

  doLoadPosts() {
    this.activatedRoute.params.subscribe(params => {
      if (params['slug'] == null) {
        this.category = 'All Posts';
        this.app.categoryID = null;
        this.app.loadPosts();
      }
      if (this.app.categories) {
        this.app.categories.filter(category => {
          if (category.slug === params['slug']) {
            this.category = category.name;
            this.app.categoryID = category.id;
            this.app.loadPosts();
          }
        });
      }
    });
  }
}

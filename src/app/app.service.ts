import { Injectable } from '@angular/core';
import { WordpressApiService } from './services/wordpress-api.service';
import {
  CategoryResponse,
  ViewPostResponse,
  MediaResponse,
  ViewUserResponse,
  ViewCommentResponse,
} from './models/wordpress.model';
import { Router } from '@angular/router';

@Injectable()
export class AppService {
  categories: CategoryResponse[] = null; // for sidebar menu.
  categoryID: number = null; // for post category if there is category selected.
  comments: ViewCommentResponse[] = null; // container for comments.
  posts: ViewPostResponse[] = null; // container for posts rendered in forum page.
  profileID: number = null; // reference pass to loadUserMedia and loadUserPosts.
  profileMedia: MediaResponse[] = null; // for media component.
  profilePosts: ViewPostResponse[] = null; // for profile posts.
  contributors: ViewUserResponse[] | any[] = null; // for contributor component.

  // Pagination
  length: number = null;
  pageSize = 10;
  pageIndex = 0;

  constructor(public router: Router, public wp: WordpressApiService) {
    this.doInit();
  }

  /**
   * this initialized.
   */
  private doInit() {
    this.loadCategories();
    this.loadContributors();
  }

  /**
   * return true if logged in.
   */
  get isLoggedIn() {
    return !!this.wp.getID;
  }

  /**
   * return true if logged out.
   */
  get isLoggedOut() {
    return !this.isLoggedIn;
  }

  get isForum() {
    return window.location.pathname.split('/')[1] === 'forum';
  }

  /**
   * will get categories from wordpress and store in categories.
   */
  loadCategories() {
    this.wp.showCategory().subscribe(data => {
      this.categories = <CategoryResponse[]>data.body;
      if (this.isForum) {
        this.router.navigate(['/forum']);
      }
    });
  }

  /**
   * load contributors for forum.
   */
  loadContributors() {
    this.wp.showUser().subscribe(data => {
      this.contributors = <ViewUserResponse[]>data.body;
    });
  }

  /**
   * will get posts in specific category if category is not null,
   * else it will return posts regardless of their category(s).
   * @param param (optional) for pagination for now.
   */
  loadPosts(param?: string) {
    param ? (param += '&') : (param = '?');
    if (this.categoryID) {
      param += 'categories=' + this.categoryID + '&';
    }
    if (this.profileID) {
      param += 'author=' + this.profileID + '&';
    }
    param += '_embed';
    this.wp.showPost(param).subscribe(data => {
      this.length = parseInt(data.headers.get('X-WP-Total'), 10);
      this.posts = <ViewPostResponse[]>data.body;
      console.log('posts' + param);
    });
  }
}

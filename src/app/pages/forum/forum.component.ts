import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressService } from 'src/app/services/wordpress.service';
import {
  ViewPostResponse,
  ViewUserResponse,
  PostCreate,
} from 'src/app/models/wordpress.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
})
export class ForumComponent implements OnInit {
  category: string;
  categoryID: number;
  posts: ViewPostResponse[];
  users: ViewUserResponse[];

  constructor(
    private activatedRoute: ActivatedRoute,
    public wpService: WordpressService,
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      if (params['name'] == null) {
        this.category = 'All Posts';
      } else {
        this.category = params['name'];
      }
      this.loadCategories();
    });
    this.loadUsers();
  }

  /**
   * this will load categories and posts related to this category.
   * once there is no category selected this will load all posts regardless the categories.
   */
  loadCategories() {
    if (this.category !== 'All Posts') {
      this.wpService.getCategories('?slug=' + this.category).subscribe(data => {
        this.categoryID = data[0].id;
        this.loadPosts(this.categoryID);
      });
    } else {
      this.loadPosts();
    }
  }

  /**
   * this will load all posts in specific category of user.
   * @param id (optional) to reference category of posts collection.
   */
  loadPosts(id?: any) {
    let param: string;
    if (id) {
      param = '?categories=' + id + '&_embed=author';
    } else {
      param = '?_embed=author';
    }
    this.wpService.getPosts(param).subscribe(data => {
      if (data.body == null) {
        this.posts = [{ title: { raw: '', rendered: 'No posts here ..' } }];
      } else {
        console.log(data.body);
        this.posts = <ViewPostResponse[]>data.body;
      }
    });
  }

  /**
   * this will load all users who have posts or contributed.
   */
  loadUsers() {
    this.wpService.getUsers().subscribe(data => {
      this.users = <ViewUserResponse[]>data;
    });
  }

  /**
   * will create post and clear fields.
   * @param form the form data on submit.
   */
  onSubmitPost(form) {
    const post: PostCreate = form.value;
    const param = '?_embed=author';
    post.status = 'publish';
    post.categories = this.categoryID;
    this.wpService.createPost(post, param).subscribe(data => {
      this.posts.unshift(data);
      form.reset();
    });
  }
}

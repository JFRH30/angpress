import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Service
import { UsersService } from '../../services/users.service';
import { CategoriesService } from 'src/app/services/categories.service';
import { PostsService } from 'src/app/services/posts.service';
import { MediaService } from 'src/app/services/media.service';

// Interface
import { ViewUserResponse } from 'src/app/models/users.model';
import { CategoryResponse } from 'src/app/models/categories.model';
import { ViewPostResponse, PostCreate } from 'src/app/models/posts.model';
import { MediaResponse } from 'src/app/models/media.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  user: ViewUserResponse;
  categories: CategoryResponse[];
  posts: ViewPostResponse[];
  medias: MediaResponse[];

  constructor(
    public usersService: UsersService,
    private categoriesService: CategoriesService,
    private postsService: PostsService,
    private mediaService: MediaService,
    private activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit() {
    let user = this.activatedRoute.snapshot.paramMap.get('user');
    this.loadCategories();
    if (!user) {
      user = this.usersService.getID.toString();
    }
    this.loadProfile(user);
    this.loadMedias();
  }

  /**
   * this will load all categories.
   */
  loadCategories() {
    this.categoriesService.getCategories().subscribe(data => {
      this.categories = <CategoryResponse[]>data;
    });
  }

  /**
   * this will load all posts in specific category of user.
   * @param id to reference category of posts collection.
   */
  loadPosts(id: number) {
    let user = this.activatedRoute.snapshot.paramMap.get('user');

    if (!user) {
      user = this.usersService.getID.toString();
    }

    this.postsService
      .getPosts('?categories=' + id + '&author=' + user)
      .subscribe(data => {
        if (data.body[0] == null) {
          this.posts = [{ title: { raw: '', rendered: 'No posts here ..' } }];
        } else {
          this.posts = <ViewPostResponse[]>data.body;
        }
      });
  }

  /**
   * will return user data.
   * @param id to reference specific user.
   */
  loadProfile(id?: any) {
    this.usersService.getProfile(id).subscribe(data => {
      console.log(data);
      this.user = <ViewUserResponse>data;
    });
  }

  /**
   * will return all user media uploaded by user.
   * used for featured media.
   */
  loadMedias() {
    this.mediaService.getMedias().subscribe(data => {
      this.medias = <MediaResponse[]>data;
    });
  }

  /**
   * will create post and clear fields.
   * @param form the form data on submit.
   */
  onSubmitPost(form) {
    const post: PostCreate = form.value;
    this.postsService.createPost(post).subscribe(data => {
      console.log(data);
      form.reset();
    });
  }
}

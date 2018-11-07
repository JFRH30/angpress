import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressService } from 'src/app/services/wordpress.service';
import {
  ViewUserResponse,
  CategoryResponse,
  ViewPostResponse,
  MediaResponse,
  PostCreate,
  USER_ENDPOINT,
} from 'src/app/models/wordpress.model';

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
    private activatedRoute: ActivatedRoute,
    public wpService: WordpressService,
  ) {}

  ngOnInit() {
    this.loadCategories();
    let user = this.activatedRoute.snapshot.params['user'];
    if (user == null) {
      user = this.wpService.getID;
    }
    this.loadProfile(user);
    if (this.wpService.isLogged) {
      this.loadMedias();
    }
  }

  /**
   * this will load all categories.
   */
  loadCategories() {
    this.wpService.getCategories().subscribe(data => {
      this.categories = <CategoryResponse[]>data;
    });
  }

  /**
   * this will load all posts of user in specific category.
   * @param id to reference category of posts collection.
   */
  loadPosts(id: number) {
    this.posts = undefined;

    let user = this.activatedRoute.snapshot.paramMap.get('user');

    if (!user) {
      user = this.wpService.getID.toString();
    }

    const param = '?categories=' + id + '&author=' + user + '&_embed=author';

    this.wpService.getPosts(param).subscribe(data => {
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
    this.wpService.getProfile(id).subscribe(data => {
      console.log(data);
      this.user = <ViewUserResponse>data;
    });
  }

  /**
   * will return all user media uploaded by user.
   * used for featured media.
   */
  loadMedias() {
    const param = '?author=' + this.wpService.getID;

    this.wpService.getMedias(param).subscribe(data => {
      this.medias = <MediaResponse[]>data;
    });
  }

  /**
   * will create post and clear fields.
   * @param form the form data on submit.
   */
  onSubmitPost(form) {
    const post: PostCreate = form.value;

    if (!post.featured_media) {
      post.featured_media = 0;
    }

    post.status = 'publish';

    this.wpService.createPost(post).subscribe(data => {
      console.log(data);
      form.reset();
    });
  }
}

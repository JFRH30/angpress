import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { PostCreate, ViewPostResponse } from 'src/app/models/wordpress.model';

@Component({
  selector: 'create-post-component',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss'],
})
export class CreatePostComponent implements OnInit {
  constructor(public app: AppService) {}

  ngOnInit() {}

  /**
   * will create post and clear fields.
   * @param form the form data on submit.
   */
  onSubmitPost(form) {
    const post: PostCreate = form.value;
    if (!post.featured_media) {
      post.featured_media = 0;
    }
    if (!post.categories) {
      // if no category selected this will be uncategorize if not post.categories = 0
      this.app.categoryID ? (post.categories = this.app.categoryID) : (post.categories = 1);
    }
    post.status = 'publish';
    this.app.wp.createPost(post, '?_embed').subscribe(data => {
      console.log(this.app.posts);
      console.log(data);
      this.app.posts.unshift(data);
      alert('You have successfullu posted: ' + data.title.rendered);
      form.reset();
    });
  }
}

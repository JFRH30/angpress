import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { PostCreate } from 'src/app/models/wordpress.model';

@Component({
  selector: 'app-create-post',
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
    post.status = 'publish';
    this.app.wp.createPost(post).subscribe(data => {
      console.log(data);
      form.reset();
    });
  }
}

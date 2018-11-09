import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { PostCreate } from 'src/app/models/wordpress.model';

@Component({
  selector: 'app-quick-post',
  templateUrl: './quick-post.component.html',
  styleUrls: ['./quick-post.component.scss'],
})
export class QuickPostComponent implements OnInit {
  constructor(public app: AppService) {}

  ngOnInit() {}

  /**
   * will create post and clear fields.
   * @param form the form data on submit.
   */
  onSubmitPost(form) {
    const post: PostCreate = form.value;
    const param = '?_embed';
    if (this.app.categoryID) {
      post.categories = this.app.categoryID;
    }
    post.status = 'publish';
    this.app.wp.createPost(post, param).subscribe(data => {
      this.app.posts.unshift(data);
      form.reset();
    });
  }
}

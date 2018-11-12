import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { ViewPostResponse, MediaResponse } from 'src/app/models/wordpress.model';

@Component({
  selector: 'edit-post-component',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  @Input()
  editPost: ViewPostResponse;
  constructor(public app: AppService) {}

  ngOnInit() {
    this.loadMedia();
  }

  loadMedia() {
    const param = '?author=' + this.app.wp.getID + '&_embed';
    this.app.wp.showMedia(param).subscribe(data => {
      this.app.profileMedia = <MediaResponse[]>data.body;
    });
  }

  onUpdatePost(form) {
    const value = form.value;
    this.app.wp.updatePost(this.editPost.id, value).subscribe(data => {
      this.editPost = Object.assign(this.editPost, data);
      alert('You have successfully edited post: ' + this.editPost.title.rendered);
    });
  }
}

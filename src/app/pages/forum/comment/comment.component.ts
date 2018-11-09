import { Component, OnInit, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { CommentCreate } from 'src/app/models/wordpress.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
})
export class CommentComponent implements OnInit {
  @Input()
  postID;

  constructor(public app: AppService) {}

  ngOnInit() {}

  onSubmitComment(form) {
    const comment: CommentCreate = form.value;
    comment.post = this.postID;
    comment.author = this.app.wp.getID;
    this.app.wp.createComment(comment).subscribe(data => {
      this.app.comments.push(data);
      form.reset();
    });
  }
}

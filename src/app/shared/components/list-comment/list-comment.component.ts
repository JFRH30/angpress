import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ViewCommentResponse, CommentUpdate, ViewPostResponse } from 'src/app/models/wordpress.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'list-comment-component',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListCommentComponent implements OnInit {
  @Input()
  postID: number;
  comments: ViewCommentResponse[];
  children: ViewCommentResponse[];

  showEditComment = false;
  commentID: number = null;

  constructor(public app: AppService) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments(parentID?: number) {
    if (!parentID) {
      parentID = 0;
    }
    const param = '?post=' + this.postID + '&parent=' + parentID;
    this.app.wp.showComment(param).subscribe(data => {
      if (parentID > 0) {
        this.children = <ViewCommentResponse[]>data.body;
      }
      this.app.comments = <ViewCommentResponse[]>data.body;
      console.log(data);
    });
  }

  onUpdateComment(form, index: number) {
    const comment: CommentUpdate = form.value;
    comment.post = this.postID;
    comment.author = this.app.wp.getID;
    this.app.wp.updateComment(this.commentID, comment).subscribe(data => {
      this.app.comments[index] = Object.assign(this.app.comments[index], data);
      this.showEditComment = false;
      this.commentID = null;
    });
  }

  onDeleteComment(id, index) {
    this.app.wp.deleteComment(id, '?force=true').subscribe(data => {
      this.app.comments.splice(index, 1);
    });
  }
}

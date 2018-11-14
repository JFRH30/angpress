import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ViewCommentResponse, CommentUpdate } from 'src/app/models/wordpress.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'list-comment-component',
  templateUrl: './list-comment.component.html',
  styleUrls: ['./list-comment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ListCommentComponent implements OnInit {
  @Input()
  postID: number; // to know what post we are handling.
  commentID: number; // used for updating comment.
  commentReplyID: number; // used for creating reply and showing list of replies.

  showEditComment = false; // switch for editing comment.
  showReply = false; // switch for displaying replies.

  constructor(public app: AppService) {}

  ngOnInit() {
    this.loadComments();
  }

  /**
   * will load comments and subcomments.
   */
  loadComments() {
    let parent = '&parent=';
    if (!this.commentReplyID) {
      parent += '0';
    } else {
      parent = parent + this.commentReplyID;
    }
    const param = '?post=' + this.postID + parent + '&order=asc';
    this.app.wp.showComment(param).subscribe(
      (data) => {
        if (!this.commentReplyID) {
          this.app.comments = <ViewCommentResponse[]>data.body;
        }
        if (this.commentReplyID) {
          this.app.commentReply = Object.assign(this.app.commentReply, {
            [this.commentReplyID]: <ViewCommentResponse[]>data.body,
          });
        }
        console.log(this.app.commentReply);
      },
      (e) => this.app.errorLog(e, 'Show Comments'),
    );
  }

  /**
   * will update comment and subcomment.
   * @param form where the data will come from.
   * @param index to reference the position of the item in the array collection.
   */
  onUpdateComment(form, index: number) {
    const comment: CommentUpdate = form.value;
    comment.post = this.postID;
    comment.author = this.app.wp.getID;
    this.app.wp.updateComment(this.commentID, comment).subscribe(
      (data) => {
        // check if both swith are true.
        if (this.showEditComment && this.showReply) {
          this.app.commentReply[this.commentReplyID][index] = Object.assign(
            this.app.commentReply[this.commentReplyID][index],
            data,
          );
        } else {
          this.app.comments[index] = Object.assign(this.app.comments[index], data);
        }
        // to display updated value.
        this.showEditComment = false;
        // reset for next query.
        this.commentID = null;
      },
      (e) => this.app.errorLog(e, 'Update Comment'),
    );
  }

  onDeleteComment(id, index) {
    this.app.wp.deleteComment(id, '?force=true').subscribe(
      (data) => {
        if (this.showReply) {
          this.app.commentReply[this.commentReplyID].splice(index, 1);
        } else {
          this.app.comments.splice(index, 1);
        }
      },
      (e) => this.app.errorLog(e, 'Delete Comment'),
    );
  }
}

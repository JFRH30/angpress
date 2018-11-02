import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { COMMENT_ENDPOINT } from '../models/endpoints.model';
import { CommentCreate, CommentUpdate } from '../models/comments.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class CommentsService {
  constructor(private http: HttpClient, private usersService: UsersService) {}

  /**
   * will store and return comment if successful.
   * @param comment data to be stored in wordpress as comment.
   */
  createComment(comment: CommentCreate) {
    comment.author = this.usersService.getID;
    comment.author_name = this.usersService.getName;
    return this.http.post(
      COMMENT_ENDPOINT,
      comment,
      this.usersService.wpAuthPass,
    );
  }

  getComment() {}

  getComments(postId: number, parentId: number) {}

  /**
   * will update and return comment if successful.
   * @param id to reference comment to be updated.
   * @param comment data to update in existing comment on wordpress.
   */
  updateComment(id: number, comment: CommentUpdate) {
    return this.http.post(
      COMMENT_ENDPOINT + '/' + id,
      comment,
      this.usersService.wpAuthPass,
    );
  }

  /**
   * will delete comment.
   * @param id to reference the comment to be deleted.
   * @param force (optional) to determine if you're going to trash or delete.
   * @param password (optional) if protected.
   */
  deleteComment(id: number, force?: boolean, password?: string) {
    if (!force) {
      force = false;
    }
    if (!password) {
      password = '';
    }
    return this.http.delete(
      COMMENT_ENDPOINT + '/' + id + '?force=' + force + '&password=' + password,
      this.usersService.wpAuthPass,
    );
  }
}

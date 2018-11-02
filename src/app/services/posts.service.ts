import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { POST_ENDPOINT } from '../models/endpoints.model';
import { PostCreate, PostUpdate } from '../models/posts.model';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient, private usersService: UsersService) {}

  /**
   * will store and return post if successful.
   * @param post data to be stored in wordpress as post.
   * @param param (optional) to modify response if needed.
   */
  createPost(post: PostCreate, param?: string) {
    const checkedParam = this.usersService.checkParams(param);
    return this.http.post<any>(
      POST_ENDPOINT + checkedParam,
      post,
      this.usersService.wpAuthPass,
    );
  }

  /**
   * will return 10 recent posts.
   * @param param (optional) to modify response if needed.
   * note: this use 'observe: response' as options.
   */
  getPosts(param?: string) {
    const checkedParam = this.usersService.checkParams(param);
    return this.http.get(POST_ENDPOINT + checkedParam, {
      observe: 'response',
    });
  }

  /**
   * will update and return post if successful.
   * @param id to reference specific post.
   * @param post data to update in existing post on wordpress.
   * @param param (optional) to modify response if needed.
   */
  updatePost(id: number, post: PostUpdate, param?: string) {
    const checkedParam = this.usersService.checkParams(param);
    return this.http.post(
      POST_ENDPOINT + '/' + id + checkedParam,
      post,
      this.usersService.wpAuthPass,
    );
  }

  /**
   * will delete post.
   * @param id to reference post to be deleted.
   * @param force (optional) to determine if you're going to trash or delete.
   */
  deletePost(id: number, force?: boolean) {
    if (!force) {
      force = false;
    }
    return this.http.delete(
      POST_ENDPOINT + '/' + id + '?force=' + force,
      this.usersService.wpAuthPass,
    );
  }
}

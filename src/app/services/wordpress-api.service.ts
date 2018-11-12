import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { CookieService, CookieOptions } from 'ngx-cookie';
import {
  CategoryCreate,
  CategoryUpdate,
  CommentCreate,
  CommentUpdate,
  MediaCreate,
  MediaUpdate,
  PostCreate,
  PostUpdate,
  UserCreate,
  UserUpdate,
  EditUserResponse,
  CATEGORY_ENDPOINT,
  COMMENT_ENDPOINT,
  MEDIA_ENDPOINT,
  POST_ENDPOINT,
  USER_ENDPOINT,
  ViewPostResponse,
} from '../models/wordpress.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WordpressApiService {
  constructor(private http: HttpClient) {}

  /**
   * will return httpHeaders.
   * @param id username or id.
   * @param password password or security_code.
   */
  gethttpHeaders(options: { id: string; password: string }) {
    const httpHeaders = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${options.id}:${options.password}`),
      }),
    };
    return httpHeaders;
  }

  /**
   * will return headers that uses user id and security_code
   * for all http request that needs auth.
   */
  get getWPPass() {
    const options = {
      id: this.getID.toString(),
      password: this.getCode,
    };
    return this.gethttpHeaders(options);
  }

  /**
   * will save user info in cookie valid for 1 year.
   * @param userData response from WP-API after login or registration.
   */
  saveLocale(userData) {
    const data = JSON.stringify(userData);
    localStorage.setItem('wp-id', data);
  }

  /**
   * will return user info in JSON format.
   */
  get getSaveLocale() {
    const data = JSON.parse(localStorage.getItem('wp-id'));
    return <EditUserResponse>data;
  }

  /**
   * will return avatar_urls array.
   */
  get getAvatar() {
    if (this.getSaveLocale) {
      const user = this.getSaveLocale;
      return user.avatar_urls;
    }
    return null;
  }

  /**
   * will return security code.
   */
  get getCode() {
    if (this.getSaveLocale) {
      const user = this.getSaveLocale;
      return user.security_code;
    }
    return null;
  }

  /**
   * will return id in type number.
   */
  get getID() {
    if (this.getSaveLocale) {
      const user = this.getSaveLocale;
      return user.id;
    }
    return null;
  }

  /**
   * will return name.
   * this will be used as display name,
   * since posts, comments, etc only get this to reference the author.
   */
  get getName() {
    if (this.getSaveLocale) {
      const user = this.getSaveLocale;
      return user.name;
    }
    return null;
  }

  /**
   * will return empty string if param is undefined.
   * @param param string to check.
   */
  checkParam(param) {
    if (!param) {
      return (param = '');
    }
    return param;
  }

  // ==========================
  //  CATEGORIES RELATED CODES
  // ==========================

  /**
   * will return data store in wordpress if successful.
   * @param category data to store in wordpress.
   * @param param (optional) parameter for wordpress api.
   * @description note: for admin only.
   */
  createCategory(category: CategoryCreate, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.post(CATEGORY_ENDPOINT + validParam, category, this.getWPPass);
  }

  /**
   * will retrieve category (applicable for retriving list of category).
   * @param param (optional) parameter for wordpress api.
   * @description will show 10 category per page.
   */
  showCategory(param?: string) {
    const validParam = this.checkParam(param);
    return this.http.get(CATEGORY_ENDPOINT + validParam, { observe: 'response' });
  }

  /**
   * will return data updated in wordpress if successful.
   * @param id to reference a category to update.
   * @param category data to update in specific category.
   * @param param (optional) parameter for wordpress api.
   * @description note: for admin only.
   */
  updateCategory(id: number, category: CategoryUpdate, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.post(CATEGORY_ENDPOINT + '/' + id + validParam, category, this.getWPPass);
  }

  /**
   * will return data with deleted properties set to true if using force parameter.
   * will return data with 'status : trach' if not using force parameter.
   * @param id to reference a category to delete.
   * @param param (optional) parameter for wordpress api.
   * @description note: for admin only.
   */
  deleteCategory(id: number, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.delete(CATEGORY_ENDPOINT + '/' + id + validParam, this.getWPPass);
  }

  // ==========================
  //   COMMENTS RELATED CODES
  // ==========================

  /**
   * will return data store in wordpress if successful.
   * @param comment data to store in wordpress.
   * @param param (optional) parameter for wordpress api.
   * @description for register user only.
   */
  createComment(comment: CommentCreate, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.post(COMMENT_ENDPOINT + validParam, comment, this.getWPPass);
  }

  /**
   * will retrieve comment (applicable for retriving list of comment).
   * @param param (optional) parameter for wordpress api.
   * @description will show 10 comment per page.
   */
  showComment(param?: string) {
    const validParam = this.checkParam(param);
    return this.http.get(COMMENT_ENDPOINT + validParam, { observe: 'response' });
  }

  /**
   * will return data updated in wordpress if successful.
   * @param id to reference a comment to update.
   * @param comment data to update in specific comment.
   * @param param (optional) parameter for wordpress api.
   * @description for register user only and owner only.
   */
  updateComment(id: number, comment: CommentUpdate, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.post(COMMENT_ENDPOINT + '/' + id + validParam, comment, this.getWPPass);
  }

  /**
   * will return data with deleted properties set to true if using force parameter.
   * will return data with 'status : trach' if not using force parameter.
   * @param id to reference a comment to delete.
   * @param param (optional) parameter for wordpress api.
   * @description for register user only and owner only.
   */
  deleteComment(id: number, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.delete(COMMENT_ENDPOINT + '/' + id + validParam, this.getWPPass);
  }

  // ==========================
  //    MEDIA RELATED CODES
  // ==========================

  /**
   * will return data store in wordpress if successful.
   * @param media data to store in wordpress.
   * @param param (optional) parameter for wordpress api.
   * @description for register user only.
   */
  createMedia(media: FormData, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.post(MEDIA_ENDPOINT + validParam, media, this.getWPPass);
  }

  /**
   * will retrieve media (applicable for retriving list of media).
   * @param param (optional) parameter for wordpress api.
   * @description will show 10 media per page.
   */
  showMedia(param?: string) {
    const validParam = this.checkParam(param);
    return this.http.get(MEDIA_ENDPOINT + validParam, { observe: 'response' });
  }

  /**
   * will return data updated in wordpress if successful.
   * @param id to reference a media to update.
   * @param media data to update in specific media.
   * @param param (optional) parameter for wordpress api.
   * @description for register user only and owner only.
   */
  updateMedia(id: number, media: MediaUpdate, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.post(MEDIA_ENDPOINT + '/' + id + validParam, media, this.getWPPass);
  }

  /**
   * will return data with deleted properties set to true if using force parameter.
   * will return data with 'status : trach' if not using force parameter.
   * @param id to reference a media to delete.
   * @param param (optional) parameter for wordpress api.
   * @description for register user only and owner only.
   */
  deleteMedia(id: number, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.delete(MEDIA_ENDPOINT + '/' + id + validParam, this.getWPPass);
  }

  // ==========================
  //    POSTS RELATED CODES
  // ==========================

  /**
   * will return data store in wordpress if successful.
   * @param post data to store in wordpress.
   * @param param (optional) parameter for wordpress api.
   * @description for register user only.
   */
  createPost(post: PostCreate, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.post<ViewPostResponse>(POST_ENDPOINT + validParam, post, this.getWPPass);
  }

  /**
   * will retrieve post (applicable for retriving list of post).
   * @param param (optional) parameter for wordpress api.
   * @description will show 10 post per page.
   */
  showPost(param?: string) {
    const validParam = this.checkParam(param);
    return this.http.get(POST_ENDPOINT + validParam, { observe: 'response' });
  }

  /**
   * will return data updated in wordpress if successful.
   * @param id to reference a post to update.
   * @param post data to update in specific post.
   * @param param (optional) parameter for wordpress api.
   * @description for register user only and owner only.
   */
  updatePost(id: number, post, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.post(POST_ENDPOINT + '/' + id + validParam, post, this.getWPPass);
  }

  /**
   * will return data with deleted properties set to true if using force parameter.
   * will return data with 'status : trach' if not using force parameter.
   * @param id to reference a post to delete.
   * @param param (optional) parameter for wordpress api.
   * @description for register user only and owner only.
   */
  deletePost(id: number, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.delete(POST_ENDPOINT + '/' + id + validParam, this.getWPPass);
  }

  // ==========================
  //     USER RELATED CODES
  // ==========================

  /**
   * will return data store in wordpress if successful.
   * @param user data to store in wordpress.
   * @param param (optional) parameter for wordpress api.
   */
  register(user: UserCreate, param?: string) {
    const validParam = this.checkParam(param);
    return this.http.post<EditUserResponse>(USER_ENDPOINT + validParam, user).pipe(tap(data => this.saveLocale(data)));
  }

  /**
   * will retrieve user.
   * @param id (optional) to reference user.
   * @param param (optional) parameter for wordpress api.
   * @param auth (optional) header to pass in the http request.
   * @description usage: If login() pass only auth and param(optional).
   *                     If Profile() pass only id and param(optional).
   */
  showProfile(id?: number, param?: string, auth?: any) {
    const validParam = this.checkParam(param);
    if (!auth && id !== this.getID) {
      return this.http.get(USER_ENDPOINT + '/' + id + validParam, { observe: 'body' });
    }
    if (!auth && id === this.getID) {
      return this.http.get(USER_ENDPOINT + '/me' + validParam, this.getWPPass);
    }
    return this.http.get(USER_ENDPOINT + validParam, auth);
  }

  /**
   * will retrieve user.
   * @param param (optional) parameter for wordpress api.
   * @description will show 10 user per page with publish posts only.
   */
  showUser(param?: string) {
    const validParam = this.checkParam(param);
    return this.http.get(USER_ENDPOINT + validParam, { observe: 'response' });
  }

  /**
   * will return data updated in wordpress if successful.
   * @param user data to update in specific user.
   * @param param (optional) parameter for wordpress api.
   * @description for register user only and owner only.
   */
  updateUser(user: UserUpdate, param?: string) {
    const validParam = this.checkParam(param);
    return this.http
      .post<EditUserResponse>(USER_ENDPOINT + validParam, user, this.getWPPass)
      .pipe(tap(data => this.saveLocale(data)));
  }

  /**
   * will return data with deleted properties set to true if using force parameter.
   * will return data with 'status : trach' if not using force parameter.
   * @param reassign reference to user that will receive all the posts of deleted user. required.
   * @param id to reference a user to delete.
   * @param param (optional) parameter for wordpress api.
   * @description for register user only and owner only.
   */
  deleteUser(reassign: number, id?: number, param?: string) {
    const validParam = this.checkParam(param);
    let user: string | number = '';
    if (!id) {
      user = '/me';
    } else {
      user = id;
    }
    const urlParam = user + '?reassign=' + reassign + validParam;
    return this.http.delete(USER_ENDPOINT + urlParam);
  }

  /**
   * will create and store user data in cookie if successful.
   * @param username will be the value passed to Basic Authorization username.
   * @param password will be the value passed to Basic Authorization password.
   * @description note: this uses '?context=edit'.
   */
  login(username: string, password: string) {
    const options = this.gethttpHeaders({ id: username, password: password });
    return this.showProfile(undefined, '/me?context=edit', options).pipe(tap(data => this.saveLocale(data)));
  }

  /**
   * will logout user and delete data store in locale.
   */
  logout() {
    localStorage.removeItem('wp-id');
  }
}

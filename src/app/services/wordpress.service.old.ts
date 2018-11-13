import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import {
  CATEGORY_ENDPOINT,
  COMMENT_ENDPOINT,
  MEDIA_ENDPOINT,
  POST_ENDPOINT,
  USER_ENDPOINT,
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
  ViewCommentResponse,
} from '../models/wordpress.model';

interface WpBasicAuth {
  login?: string;
  password?: string;
  file?: string;
}

@Injectable({
  providedIn: 'root',
})
export class WordpressService {
  constructor(private http: HttpClient) {}

  //////////////////////
  // SHARED FUNCTIONS //
  //////////////////////

  /**
   * will return httpOptions
   * @param options used to pass username and password in heeader per http request.
   */
  getHttpOptions(options: WpBasicAuth = <any>{}) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${options.login}:${options.password}`),
      }),
    };
    return httpOptions;
  }

  /**
   * will return httpOptions that serve as pass for every http transaction that needs auth.
   */
  get wpAuthPass() {
    return this.getHttpOptions({
      login: this.getID.toString(),
      password: this.getSecurityCode,
    });
  }

  /////////////////////////
  // CATEGORIES FUNTIONS //
  /////////////////////////

  /**
   * will store and return category if successful.
   * @param category data to be stored in wordpress as category.
   * note: this function can only be used by user in admin level.
   */
  createCategory(category: CategoryCreate) {
    return this.http.post(CATEGORY_ENDPOINT, category, this.wpAuthPass);
  }

  /**
   * this will return the categories saved in wordpress.
   * @param param additional parameter for endpoints.
   */
  getCategories(param?) {
    const checkedParam = this.checkParams(param);
    return this.http.get(CATEGORY_ENDPOINT + checkedParam);
  }

  /**
   * will update and return data if successful.
   * @param id to reference category that will be updated.
   * @param category data to update on existing category.
   * note: this function can only be used by user in admin level.
   */
  updateCategory(id: number, category: CategoryUpdate) {
    return this.http.post(CATEGORY_ENDPOINT + '/' + id, category, this.wpAuthPass);
  }

  /**
   * will delete category.
   * @param id to reference category that wil be deleted.
   * @param force (optional) to determine if you're going to trash or delete.
   * note: this function can only br used by user in admin level.
   */
  deleteCategory(id: number, force?: boolean) {
    if (!force) {
      force = false;
    }
    return this.http.delete(CATEGORY_ENDPOINT + '/' + id + '?force=' + force, this.wpAuthPass);
  }

  ////////////////////////
  // COMMENTS FUNCTIONS //
  ////////////////////////

  /**
   * will store and return comment if successful.
   * @param comment data to be stored in wordpress as comment.
   */
  createComment(comment: CommentCreate) {
    comment.author = this.getID;
    comment.author_name = this.getName;
    return this.http.post(COMMENT_ENDPOINT, comment, this.wpAuthPass);
  }

  /**
   * will return collection of comments stored in wordpress if successful.
   * @param param additional parameter for endpoints.
   */
  getComments(param?) {
    const checkedParam = this.checkParams(param);
    return this.http.get(COMMENT_ENDPOINT + checkedParam);

    // this is if ever you fetch everything and rearrange it HAHAHAHA.
    // .pipe(
    //   tap(data => {
    //     (<ViewCommentResponse[]>data).forEach(comment => {
    //       const children: ViewCommentResponse[] = [];

    //       // this put the matching subcomment to its parent
    //       (<ViewCommentResponse[]>data).forEach(subcomment => {
    //         if (comment.id === subcomment.parent) {
    //           children.push(subcomment);
    //           comment.children = children;
    //         }
    //       });

    //       // this arrange the comment from top to buttom
    //       if (comment.children) {
    //         comment.children.forEach(child => {
    //           if (child.id === comment.id) {
    //             Object.assign(comment.children, child);
    //           }
    //         });
    //       }
    //     });
    //     return (<ViewCommentResponse[]>data).filter(
    //       comment => comment.parent === 0,
    //     );
    //   }),
    // );
  }

  /**
   * will update and return comment if successful.
   * @param id to reference comment to be updated.
   * @param comment data to update in existing comment on wordpress.
   */
  updateComment(id: number, comment: CommentUpdate) {
    return this.http.post(COMMENT_ENDPOINT + '/' + id, comment, this.wpAuthPass);
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
    const param = '/' + id + '?force=' + force + '&password=' + password;
    return this.http.delete(COMMENT_ENDPOINT + param, this.wpAuthPass);
  }

  /////////////////////
  // MEDIA FUNCTIONS // note: this is not fully tested in angular, but it works on postman,
  ///////////////////// need the 'Content-Disposition' : 'filename=(the filename with extension)'.

  /**
   * will store and return media if successful.
   * @param media data to be stored in wordpress as media.
   */
  createMedia(media) {
    return this.http.post(MEDIA_ENDPOINT, media, this.wpAuthPass);
  }

  /**
   * will return collection of media stored in wordpress if successful.
   * @param param additional parameter for endpoints.
   */
  getMedias(param?) {
    const checkedParam = this.checkParams(param);
    return this.http.get(MEDIA_ENDPOINT + checkedParam);
  }

  /**
   * will update and return media if successful.
   * @param id to reference specific media.
   * @param media data to update in existing media on wordpress.
   */
  updateMedia(id: number, media: MediaUpdate) {
    const options = this.getHttpOptions({ file: media.file });
    return this.http.post(MEDIA_ENDPOINT + '/' + id, media, options);
  }

  /**
   * will delete media.
   * @param id to reference media to be deleted.
   * @param force (optional) to determine if you're going to trash or delete.
   */
  deleteMedia(id: number, force?: boolean) {
    if (!force) {
      force = false;
    }
    return this.http.delete(MEDIA_ENDPOINT + '/' + id + '?force=' + force, this.wpAuthPass);
  }

  /////////////////////
  // POSTS FUNCTIONS //
  /////////////////////

  /**
   * will store and return post if successful.
   * @param post data to be stored in wordpress as post.
   * @param param (optional) to modify response if needed.
   */
  createPost(post: PostCreate, param?: string) {
    const checkedParam = this.checkParams(param);
    return this.http.post(POST_ENDPOINT + checkedParam, post, this.wpAuthPass);
  }

  /**
   * will return 10 recent posts.
   * @param param (optional) to modify response if needed.
   * note: this use 'observe: response' as options.
   */
  getPosts(param?: string) {
    const checkedParam = this.checkParams(param);
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
    const checkedParam = this.checkParams(param);
    return this.http.post(POST_ENDPOINT + '/' + id + checkedParam, post, this.wpAuthPass);
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
    return this.http.delete(POST_ENDPOINT + '/' + id + '?force=' + force, this.wpAuthPass);
  }

  /////////////////////
  // USERS FUNCTIONS //
  /////////////////////

  /**
   * will create and store user data in locale starage if successful. note this uses 'context=edit'.
   * @param username will be the value passed to Basic Authorization username.
   * @param password will be the value passed to Basic Authorization password.
   */
  login(username, password) {
    const options = this.getHttpOptions({
      login: username,
      password: password,
    });
    return this.getUser('?context=edit', options);
  }

  /**
   * will remove user data in locale storage.
   */
  logout() {
    localStorage.removeItem('my_account');
  }

  /**
   * will return and store data in wordpress and locale storage if successful.
   * @param user data to be stored upon user registration.
   */
  register(user: UserCreate) {
    return this.http.post(USER_ENDPOINT, user).pipe(tap(data => this.savedInLocale('my', data)));
  }

  /**
   * will update the existing data in wordpress and store updated record in locale storage.
   * @param user data to be updated in user information.
   * @param param (optional) to modify response if needed.
   */
  updateUser(user: UserUpdate, param?: string) {
    const checkedParam = this.checkParams(param);
    return this.http
      .post(USER_ENDPOINT + '/me' + checkedParam, user, this.wpAuthPass)
      .pipe(tap(data => this.savedInLocale('my', data)));
  }

  /**
   * will return user data and store it in locale storage.
   * @param param (optional) to modify response if needed.
   * @param auth (optional) used as options in the header.
   */
  getUser(param?: string, auth?) {
    const checkedParam = this.checkParams(param);
    if (!auth) {
      auth = this.wpAuthPass;
    }
    return this.http.get(USER_ENDPOINT + '/me' + checkedParam, auth).pipe(tap(data => this.savedInLocale('my', data)));
  }

  /**
   * will return user data.
   * @param id to reference specific user
   * note: this the same as getUser but for visitor only.
   */
  getProfile(id: number) {
    if (id === this.getID) {
      return this.http.get(USER_ENDPOINT + '/me', this.wpAuthPass);
    }
    return this.http.get(USER_ENDPOINT + '/' + id);
  }

  /**
   * will return all users in wordpress.
   * @param param (optional) to modify response if needed.
   */
  getUsers(param?: string) {
    const checkedParam = this.checkParams(param);
    return this.http.get(USER_ENDPOINT + checkedParam);
  }

  /**
   * will delete user.
   * @param reassign reference to user that will receive all the posts of deleted user.
   * @param id (optional) to reference user that will be deleted if you're admin.
   * @param force (optional) to determine if you're going to trash or delete.
   */
  deleteUser(reassign: number, id?: number, force?: boolean) {
    let user;
    if (!id) {
      user = '/me';
    } else {
      user = id;
    }
    if (!force) {
      force = false;
    }
    this.http.delete(USER_ENDPOINT + user + '?force=' + force + '&reassign=' + reassign, this.wpAuthPass);
  }

  ////////////////////
  // LOCALE STORAGE //
  ////////////////////

  /**
   * will store data in locale storage
   * @param user data to be stored in locale storage.
   */
  savedInLocale(prefix: string, user) {
    const data = JSON.stringify(user);
    localStorage.setItem(prefix + '_account', data);
  }

  /**
   * this will return the data stored in locale storage.
   */
  get getUserLocaleSave() {
    const user = localStorage.getItem('my_account');
    return <EditUserResponse>JSON.parse(user);
  }

  /**
   * will return true if there is id saved in locale storage.
   */
  get isLogged() {
    return !!this.getID;
  }

  /**
   * will get the id stored in locale storage.
   */
  get getID() {
    if (this.getUserLocaleSave) {
      const user = this.getUserLocaleSave;
      return user.id;
    }
    return null;
  }

  /**
   * will get the security code stored in locale storage.
   */
  get getSecurityCode() {
    if (this.getUserLocaleSave) {
      const user = this.getUserLocaleSave;
      return user.security_code;
    }
    return null;
  }

  /**
   * will get the security code stored in locale storage.
   */
  get getName() {
    if (this.getUserLocaleSave) {
      const user = this.getUserLocaleSave;
      return user.name;
    }
    return null;
  }

  /**
   * will get the security code stored in locale storage.
   */
  get getAvatar() {
    if (this.getUserLocaleSave) {
      const user = this.getUserLocaleSave;
      return user.avatar_urls;
    }
    return null;
  }

  /**
   * will return empty string if param is not used.
   * @param param additional parameter for endpoints.
   */
  checkParams(param) {
    if (!param) {
      param = '';
      return param;
    }
    return param;
  }
}

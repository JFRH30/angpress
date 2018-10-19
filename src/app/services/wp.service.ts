import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { UserUpdate } from './wordpress.service';

export const wordpressUrl = 'http://localhost:80/wordpress';
export const rest = wordpressUrl + '/wp-json/wp/v2';
const categoryEndpoint = rest + '/categories';
const commentEndpoint = rest + '/comments';
const postEndpoint = rest + '/posts';
export const userEndpoint = rest + '/users';
export const profileEndpoint = wordpressUrl + '/wp-json/custom/api/profile';

/********************************************
 * these are interface use by this service. *
 ********************************************/
export interface WpOptions {
  login: string;
  password: string;
}

export interface CreateUser {
  username: string; // Required: 1
  email: string; // Required: 1
  password: string; // Required: 1
  name?: string;
  nickname?: string;
  first_name?: string;
  last_name?: string;
  url?: string;
  description?: string;
  locale?: string;
  slug?: string;
  roles?: string;
  meta?: string;
}

export interface UpdateUser {
  id?: number;
  username?: string;
  name?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  url?: string;
  description?: string;
  locale?: string;
  nickname?: string;
  slug?: string;
  roles?: string;
  password?: string;
  meta?: string;
}

export interface UserResponse {
  avatar_urls: {};
  capabilities: {};
  description: string;
  email: string;
  extra_capabilities: {};
  first_name: string;
  id: number;
  last_name: string;
  link: string;
  locale: string;
  meta: Array<any>;
  name: string;
  nickname: string;
  register_date: string;
  roles: Array<string>;
  security_code: string;
  slug: string;
  url: string;
  username: string;
  _links: {};
}

@Injectable({
  providedIn: 'root'
})
export class WpService {
  constructor(private http: HttpClient) {}

  /********************
   * shared functions *
   ********************/

  /**
   * will return httpOptions.
   * @param options object used as 'options' args in HTTP Event.
   */
  getHttpOptions(
    options: {
      user_login: string;
      user_pass: string;
    } = <any>{}
  ) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization:
          'Basic' + btoa(`${options.user_login}:${options.user_pass}`),
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  /**
   * will return httpOptions.
   * used as 'options' args in HTTP Event when dealing with wordpress REST API.
   */
  private get wpPass() {
    return this.getHttpOptions({
      user_login: this.localeId,
      user_pass: this.localeSecurityCode
    });
  }

  /*******************************
   * function for users endpoint *
   *******************************/

  register(user: CreateUser) {
    return this.http
      .post(userEndpoint, user)
      .pipe(tap(data => this.savedInLocale(<UserResponse>data)));
  }

  /**
   * this will removed all saved user data in localeStorage.
   */
  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_username');
    localStorage.removeItem('user_security_code');
  }
  /**
   * will logged user in wordpress.
   * @param user credential that used in httpHeaders to know the user.
   */
  login(user) {
    const options = this.getHttpOptions(user);
    return this.getUser(options).pipe(
      tap(data => {
        this.savedInLocale(<any>data);
      })
    );
  }

  /**
   * will return user data.
   * @param auth this determine if the user is authenticated.
   */
  getUser(auth?: any) {
    if (!auth) {
      auth = this.wpPass;
    }
    return this.http
      .get(wordpressUrl, auth)
      .pipe(tap(data => this.savedInLocale(<any>data)));
  }

  getUsers() {}

  /**
   * determine if there is user that currently logged.
   */
  get userLogged() {
    return this.localeId;
  }

  /**
   * will update data in wordpress and localeStorage.
   * @param user updated date that will be stored in wordpress and localeStorage.
   */
  updateUser(user: UpdateUser) {
    return this.http
      .post(userEndpoint + '/me', user, this.wpPass)
      .pipe(tap(data => this.savedInLocale(<UserResponse>data)));
  }

  /**
   * will store user data in localeStorage.
   * @param user data to store in LocaleStorage.
   */
  savedInLocale(user: UserResponse) {
    localStorage.setItem('user_id', user.id.toString());
    localStorage.setItem('user_email', user.email);
    localStorage.setItem('user_username', user.username);
    localStorage.setItem('user_security_code', user.security_code);
  }

  /**
   * will return user data in specified field in localeStorage.
   * @param key used to get field in localeStorage.
   */
  getSavedInLocale(key: string) {
    return localStorage.getItem(`user_${key}`);
  }

  /**
   * will get the user id in localeStorage.
   */
  get localeId() {
    return this.getSavedInLocale('id');
  }

  /**
   * will get the user email in localeStorage.
   */
  get localeEmail() {
    return this.getSavedInLocale('email');
  }

  /**
   * will get the user username in localeStorage.
   */
  get localeUsername() {
    return this.getSavedInLocale('username');
  }

  /**
   * will get the user security code in localeStorage.
   */
  get localeSecurityCode() {
    return this.getSavedInLocale('security_code');
  }

  /********************************
   * functions for posts endpoint *
   ********************************/

  createPost() {}

  getPost() {}

  /**
   * this will get all posts from wordpress.
   */
  getPosts() {
    return this.http.get(postEndpoint);
  }

  updatePost() {}

  deletePost() {}

  /***********************************
   * functions for comments endpoint *
   ***********************************/

  createComment() {}

  getComment() {}

  getComments() {}

  updateComment() {}

  deleteComment() {}

  /*************************************
   * functions for categories endpoint *
   *************************************/

  createCategory() {}

  getCategory() {}

  getCategories() {}

  updateCategory() {}

  deleteCategory() {}
}

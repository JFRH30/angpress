import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

const wordpressEndpoint = 'http://localhost:80/wordpress';
const restApiEndpoint = wordpressEndpoint + '/wp-json/wp/v2';
const userEndpoint = restApiEndpoint + '/users';
const postEndpoint = restApiEndpoint + '/posts';
const commentEndpoint = restApiEndpoint + '/comments';
const catagoryEndpoint = restApiEndpoint + '/categories';
const profileEndpoint = wordpressEndpoint + '/wp-json/custom/api/profile';

export interface WpBasicAuth {
  login: string;
  password: string;
}

export interface UserCreate {
  username: string; // Required: 1
  email: string; // Required: 1
  password: string; // Required: 1
  name?: string;
  first_name?: string;
  last_name?: string;
  url?: string;
  description?: string;
  locale?: string;
  nickname?: string;
  slug?: string;
  roles?: string;
  meta?: string;
}

export interface UserUpdate {
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

export interface PostCreate {
  date?: string;
  date_gmt?: string;
  slug?: string;
  status?: string;
  password?: string;
  title?: string;
  content?: string;
  author?: string;
  excerpt?: string;
  featured_media?: string;
  comment_status?: string;
  ping_status?: string;
  format?: string;
  meta?: string;
  sticky?: string;
  template?: string;
  categories?: string;
  tags?: string;
}

@Injectable({
  providedIn: 'root'
})
export class WordpressService {
  constructor(private http: HttpClient) {}

  /*********************************
   * Shared Functions & Properties *
   *********************************/

  /**
   * will return httpOptions
   * @param options used to pass username & password in heeader per http request.
   */
  private getHttpOptions(options: WpBasicAuth = <any>{}) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${options.login}:${options.password}`),
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  /**
   * will return httpOptions using the id & security code to supply Basic Authorization stored in locale storage.
   */
  private get wpAuthPass() {
    return this.getHttpOptions({
      login: this.getID,
      password: this.getSecurityCode
    });
  }

  /**
   * determined if there is current user that is logged in.
   */
  get isLogged() {
    return !!this.getID;
  }

  /**
   * will saved in locale storage
   * @param user data from http response that will be saved in locale storage.
   */
  private savedInLocale(user: UserResponse) {
    localStorage.setItem('user_id', user.id.toString());
    localStorage.setItem('user_email', user.email);
    localStorage.setItem('user_username', user.username);
    localStorage.setItem('user_security_code', user.security_code);
  }

  /**
   * will get the id stored in locale storage.
   */
  get getID() {
    return localStorage.getItem('user_id');
  }

  /**
   * will get the email stored in locale storage.
   */
  get getEmail() {
    return localStorage.getItem('user_email');
  }

  /**
   * will get the username stored in locale storage.
   */
  get getUsername() {
    return localStorage.getItem('user_username');
  }

  /**
   * will get the security code stored in locale storage.
   */
  get getSecurityCode() {
    return localStorage.getItem('user_security_code');
  }

  /*********************
   * User related code *
   *********************/

  /**
   * will return user data on subcribe.
   * @param username will be the value passed in Basic Authorization username.
   * @param password will be the value passed to Basic Authorization password.
   */
  login(username, password) {
    const options = this.getHttpOptions({
      login: username,
      password: password
    });
    return this.getUser(options);
  }

  /**
   * will remove all data stored in locale storage and logged out user.
   */
  logout() {
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_username');
    localStorage.removeItem('user_email');
    localStorage.removeItem('user_security_code');
  }

  /**
   * will saved data in wordpress database & in locale storage.
   * @param user data used to register user.
   */
  register(user: UserCreate) {
    return this.http
      .post<UserResponse>(userEndpoint, user)
      .pipe(tap(data => this.savedInLocale(data)));
  }

  /**
   * will update data stored in wordpress database & locale storage.
   * @param user data to be updated in user information.
   */
  updateUSer(user: UserUpdate) {
    return this.http
      .post<UserResponse>(userEndpoint + '/me', user, this.wpAuthPass)
      .pipe(tap(data => this.savedInLocale(data)));
  }

  /**
   * will return user data & save it in locale storage.
   * @param auth (optional) used as options in the header.
   */
  getUser(auth?) {
    if (!auth) {
      auth = this.wpAuthPass;
    }
    return this.http
      .get<UserResponse>(profileEndpoint, auth)
      .pipe(tap(data => this.savedInLocale(<any>data)));
  }

  /*********************
   * Post related code *
   *********************/

  /**
   * will return all post.
   */
  getPosts() {
    return this.http.get(postEndpoint);
  }

  /**
   * will return post data.
   * @param post data used in creating posts.
   */
  createPost(post: PostCreate) {
    return this.http.post<any>(postEndpoint, post, this.wpAuthPass);
  }
}

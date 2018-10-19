import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap } from 'rxjs/operators';

/**
 * these are the url of the wp_bogz.
 */
const wordpressUrl = 'http://localhost:8000/wordpress';
const rest = wordpressUrl + '/wp-json/wp/v2';

/**
 * these are endpoints expose by wordpress.
 */
const categoryEndpoint = rest + '/categories';
const commentEndpoint = rest + '/comments';
const postEndpoint = rest + '/posts';
const userEndpoint = rest + '/users';

export interface UserCreate {
  username: string; // Login name for the user. Required: 1
  name?: string; // 	Display name for the user.
  first_name?: string; // First name for the user.
  last_name?: string; // Last name for the user.
  email: string; // The email address for the user. Required: 1
  url?: string; // URL of the user.
  description?: string; // Description of the user.
  locale?: string; // Locale for the user. One of: , en_US
  nickname?: string; // The nickname for the user.
  slug?: string; // An alphanumeric identifier for the user.
  roles?: string; // Roles assigned to the user.
  password: string; // Password for the user (never included). Required: 1
  meta?: string; // Meta fields.
}

export interface UserUpdate {
  id?: number; // user id
  username?: string; // Login name for the user. Required: 1
  name?: string; // 	Display name for the user.
  first_name?: string; // First name for the user.
  last_name?: string; // Last name for the user.
  email?: string; // The email address for the user. Required: 1
  url?: string; // URL of the user.
  description?: string; // Description of the user.
  locale?: string; // Locale for the user. One of: , en_US
  nickname?: string; // The nickname for the user.
  slug?: string; // An alphanumeric identifier for the user.
  roles?: string; // Roles assigned to the user.
  password?: string; // Password for the user (never included). Required: 1
  meta?: string; // Meta fields.
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
  date?: string; // The date the object was published, in the site's timezone.
  date_gmt?: string; // The date the object was published, as GMT.
  slug?: string; // An alphanumeric identifier for the object unique to its type.
  status?: string; // A named status for the object. One of: publish, future, draft, pending, private
  password?: string; // A password to protect access to the content and excerpt.
  title?: string; // The title for the object.
  content?: string; // The content for the object.
  author?: string; // The ID for the author of the object.
  excerpt?: string; // The excerpt for the object.
  featured_media?: string; // The ID of the featured media for the object.
  comment_status?: string; // Whether or not comments are open on the object. One of: open, closed
  ping_status?: string; // Whether or not the object can be pinged. One of: open, closed
  format?: string; // The format for the object. One of: standard, aside, chat, gallery, link, image, quote, status, video, audio
  meta?: string; // Meta fields.
  sticky?: string; // Whether or not the object should be treated as sticky.
  template?: string; // The theme file to use to display the object. One of:
  categories?: string; // The terms assigned to the object in the category taxonomy.
  tags?: string; // The terms assigned to the object in the post_tag taxonomy.
}

@Injectable({
  providedIn: 'root'
})
export class WordpressService {
  constructor(private http: HttpClient) {}

  private get loginAuth() {
    return this.getHttpOptions({
      user_login: this.myId,
      user_pass: this.mySecurityCode
    });
  }

  /**
   * Returns Http Options
   * @param options options
   * @return any
   *
   * @example
   *  const options = this.getHttpOptions({ user_login: user.username, user_pass: user.password });
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
          'Basic ' + btoa(`${options.user_login}:${options.user_pass}`),
        'Content-Type': 'application/json'
      })
    };
    return httpOptions;
  }

  /**
   * Registers
   * @param user User
   * @example
      wp.register({
        username: this.chance.email(),
        password: password,
        email: this.chance.email()
      }).subscribe(res => {
        console.log('user register: ', res);
      });
   */
  register(user: UserCreate) {
    return this.http
      .post<UserResponse>(userEndpoint, user)
      .pipe(tap(data => this.saveUserData(data)));
  }

  /**
   * Login user can update only his user data.
   * @param user User update data
   * @note user cannot change 'username'. But everything else is changable.
   */
  updateProfile(user: UserUpdate) {
    const options = this.getHttpOptions({
      user_login: this.myId,
      user_pass: this.mySecurityCode
    });
    return this.http
      .post<UserResponse>(userEndpoint + '/me', user, options)
      .pipe(tap(data => this.saveUserData(data)));
  }
  /**
   * Get user data from wordpress via rest api
   * @param user User update data
   */
  profile() {
    return this.http
      .get<UserResponse>(
        wordpressUrl + '/wp-json/custom/api/profile',
        this.loginAuth
      )
      .pipe(tap(data => this.saveUserData(data)));
  }

  /**
   *
   * @param user UserData
   */
  private saveUserData(user: UserResponse) {
    localStorage.setItem('user_id', user.id.toString());
    localStorage.setItem('user_security_code', user.security_code);
    localStorage.setItem('user_email', user.email);
    localStorage.setItem('user_username', user.username);
    localStorage.setItem('user_nickname', user.nickname);
  }

  logout() {
    localStorage.removeItem('user_id');
  }
  get isLogged() {
    return !!this.myId;
  }

  /**
   * Returns user data saved in localStorage.
   * @param key key sring like 'id', 'email', 'security_code', 'username'
   */
  private getUserData(key) {
    return localStorage.getItem('user_' + key);
  }
  get myId() {
    return this.getUserData('id');
  }
  get mySecurityCode() {
    return this.getUserData('security_code');
  }
  get myNickname() {
    return this.getUserData('nickname');
  }

  postCreate(post: PostCreate) {
    return this.http.post<any>(postEndpoint, post, this.loginAuth);
  }
}

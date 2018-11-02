import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { USER_ENDPOINT } from '../models/endpoints.model';
import {
  UserCreate,
  EditUserResponse,
  UserUpdate,
  ViewUserResponse,
} from '../models/users.model';

export interface WpBasicAuth {
  login?: string;
  password?: string;
  file?: string;
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  /**
   * will return httpOptions
   * @param options used to pass username and password in heeader per http request.
   */
  getHttpOptions(options: WpBasicAuth = <any>{}) {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${options.login}:${options.password}`),
        'Content-Type': 'application/json',
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

  /**
   * will store data in locale storage
   * @param user data to be stored in locale storage.
   */
  savedInLocale<T>(prefix: string, user) {
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
  get getNickname() {
    if (this.getUserLocaleSave) {
      const user = this.getUserLocaleSave;
      return user.nickname;
    }
    return null;
  }

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
  checkParams<T>(param) {
    if (!param) {
      param = '';
      return param;
    }
    return param;
  }

  ///////////////////////////
  //  USER CRUD functions  //
  ///////////////////////////

  /**
   * will return true if there is id saved in locale storage.
   */
  get isLogged() {
    return !!this.getID;
  }

  /**
   * will save user data in locale starage if successful.
   * @param username will be the value passed in Basic Authorization username.
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
    return this.http
      .post<ViewUserResponse>(USER_ENDPOINT, user)
      .pipe(tap(data => this.savedInLocale('my', data)));
  }

  /**
   * will update the existing data in wordpress and store updated record in locale storage.
   * @param user data to be updated in user information.
   * @param param (optional) to modify response if needed.
   */
  updateUser(user: UserUpdate, param?: string) {
    const checkedParam = this.checkParams(param);
    return this.http
      .post<EditUserResponse>(
        USER_ENDPOINT + '/me' + checkedParam,
        user,
        this.wpAuthPass,
      )
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
    return this.http
      .get<EditUserResponse>(USER_ENDPOINT + '/me' + checkedParam, auth)
      .pipe(tap(data => this.savedInLocale('my', data)));
  }

  /**
   * will return user data. note: user must be logged to view others profile.
   * @param id to reference specific user
   */
  getProfile(id: number) {
    return this.http.get(USER_ENDPOINT + '/' + id, this.wpAuthPass);
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
    if (id) {
      user = id;
    }
    if (!force) {
      force = false;
    }
    user = '/me';
    this.http.delete(
      USER_ENDPOINT + user + '?force=' + force + '&reassign=' + reassign,
      this.wpAuthPass,
    );
  }
}

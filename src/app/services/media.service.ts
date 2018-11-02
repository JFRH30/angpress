import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsersService, WpBasicAuth } from './users.service';
import { MediaCreate, MediaUpdate } from '../models/media.model';
import { MEDIA_ENDPOINT } from '../models/endpoints.model';

@Injectable({
  providedIn: 'root',
})
export class MediaService {
  constructor(private http: HttpClient, private usersService: UsersService) {}

  /**
   * will return httpOptions.
   * @param options used as gate to wordpress to be able to upload pic.
   */
  getHttpOptions(options: WpBasicAuth = <any>{}) {
    if (!options.file) {
      options.file = '';
    }
    options.login = this.usersService.getID.toString();
    options.password = this.usersService.getSecurityCode;

    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: 'Basic ' + btoa(`${options.login}:${options.password}`),
        'Content-Type': 'application/json',
        'Content-Diposition': `filename=${options.file}`,
      }),
    };

    return httpOptions;
  }

  /**
   * will store and return media if successful.
   * @param media data to be stored in wordpress as media.
   */
  createMedia(media: MediaCreate) {
    const options = this.getHttpOptions({ file: media.file });
    return this.http.post(MEDIA_ENDPOINT, media, options);
  }

  /**
   * will return specific media stored in wordpress if successful.
   * @param id to reference specific media.
   */
  getMedia(id: number) {
    const author = this.usersService.getID;
    return this.http.get(
      MEDIA_ENDPOINT + '/' + id + '?author=' + author,
      this.usersService.wpAuthPass,
    );
  }

  /**
   * will return collection of media stored in wordpress if successful.
   */
  getMedias() {
    const author = this.usersService.getID;
    return this.http.get(
      MEDIA_ENDPOINT + '?author=' + author,
      this.usersService.wpAuthPass,
    );
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
    return this.http.delete(
      MEDIA_ENDPOINT + '/' + id + '?force=' + force,
      this.usersService.wpAuthPass,
    );
  }
}

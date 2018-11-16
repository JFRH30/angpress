import { Component, OnInit } from '@angular/core';
import { MediaResponse } from 'src/app/models/wordpress.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'create-media-component',
  templateUrl: './create-media.component.html',
  styleUrls: ['./create-media.component.scss'],
})
export class CreateMediaComponent implements OnInit {
  disable = false;

  constructor(public app: AppService) {}

  ngOnInit() {
    this.loadUserMedia();
  }

  /**
   * will load user media.
   */
  loadUserMedia() {
    const param = '?author=' + this.app.wp.getID + '&_embed';
    this.app.wp.showMedia(param).subscribe(
      (data) => {
        this.app.profileMedia = <MediaResponse[]>data.body;
      },
      (e) => this.app.errorLog(e, 'Profile Media'),
    );
  }

  /**
   * upload Image.
   */
  onSubmitImage(file: any) {
    const image = file.files[0];
    const body = new FormData();
    body.append('file', image); // file upload word with form data, I don't know why.
    body.append('title', '');
    this.disable = true;
    this.app.wp.createMedia(body).subscribe(
      (data) => {
        this.app.profileMedia = [data, ...this.app.profileMedia];
        this.disable = false;
      },
      (e) => {
        this.app.errorLog(e, 'Create Media');
        this.disable = false;
      },
    );
  }

  /**
   * will delete selected image.
   * @param id to be deleted item.
   */
  onDeleteImage(id) {
    this.disable = true;
    this.app.wp.deleteMedia(id, '?force=true').subscribe(
      () => {
        this.loadUserMedia();
        alert('Successfully deleted');
        this.disable = false;
      },
      (e) => {
        this.app.errorLog(e, 'Create Media');
        this.disable = false;
      },
    );
  }
}

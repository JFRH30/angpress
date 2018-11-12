import { Component, OnInit } from '@angular/core';
import { MediaResponse } from 'src/app/models/wordpress.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'create-media-component',
  templateUrl: './create-media.component.html',
  styleUrls: ['./create-media.component.scss'],
})
export class CreateMediaComponent implements OnInit {
  media: MediaResponse[] = null;
  constructor(public app: AppService) {}

  ngOnInit() {
    this.loadUserMedia();
  }

  onSubmitImage(file: any) {
    const image = file.files[0];
    const body = new FormData();
    body.append('file', image); // file upload word with form data, I don't know why.
    body.append('title', '');
    this.app.wp.createMedia(body).subscribe(data => {
      this.app.profileMedia = [data, ...this.app.profileMedia];
    });
  }

  /**
   * will load user media.
   */
  loadUserMedia() {
    const param = '?author=' + this.app.wp.getID + '&_embed';
    this.app.wp.showMedia(param).subscribe(data => {
      this.app.profileMedia = <MediaResponse[]>data.body;
    });
  }
}

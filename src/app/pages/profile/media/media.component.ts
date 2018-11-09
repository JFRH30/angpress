import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { MediaResponse } from 'src/app/models/wordpress.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-media',
  templateUrl: './media.component.html',
  styleUrls: ['./media.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class MediaComponent implements OnInit {
  media: MediaResponse[] = null;
  constructor(public app: AppService) {}

  ngOnInit() {
    this.loadUserMedia();
  }

  onSubmitImage(file: any) {
    const image = file.files[0];
    const body = new FormData();
    body.append('file', image);
    body.append('title', '');
    this.app.wp.createMedia(body).subscribe(data => {
      // console.log(data);
      this.app.profileMedia.unshift(data);
      // this.media.unshift(data);
    });
  }

  /**
   * will load user media.
   */
  loadUserMedia() {
    const param = '?author=' + this.app.wp.getID + '&_embed';
    this.app.wp.showMedia(param).subscribe(data => {
      this.app.profileMedia = <MediaResponse[]>data.body;
      // this.media = <MediaResponse[]>data.body;
    });
  }
}

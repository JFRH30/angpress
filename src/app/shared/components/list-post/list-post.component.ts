import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'list-post-component',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
})
export class ListPostComponent implements OnInit {
  constructor(public app: AppService) {}

  ngOnInit() {}

  paginate(event) {
    console.log('paginator ' + event.pageIndex);
    event.pageIndex++;
    const param = '?page=' + event.pageIndex + '&per_page=' + event.pageSize;
    this.app.loadPosts(param);
  }
}

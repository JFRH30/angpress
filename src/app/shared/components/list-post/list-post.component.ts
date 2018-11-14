import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'list-post-component',
  templateUrl: './list-post.component.html',
  styleUrls: ['./list-post.component.scss'],
})
export class ListPostComponent implements OnInit {
  @Input()
  isReset = false;

  @ViewChild('paginator')
  paginator;

  constructor(public app: AppService) {}

  ngOnInit() {}

  paginate(event) {
    event.pageIndex++;
    const param = '?page=' + event.pageIndex + '&per_page=' + event.pageSize;
    this.app.loadPosts(param);
  }

  resetPaginator() {
    if (this.isReset) {
      this.paginator.pageIndex = 0;
    }
  }
}

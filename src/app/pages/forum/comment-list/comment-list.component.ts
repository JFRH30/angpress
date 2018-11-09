import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { ViewCommentResponse } from 'src/app/models/wordpress.model';
import { WordpressService } from 'src/app/services/wordpress.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentListComponent implements OnInit {
  @Input()
  postID: number;
  comments: ViewCommentResponse[];
  children: ViewCommentResponse[];

  constructor(private wpService: WordpressService) {}

  ngOnInit() {
    this.loadComments();
  }

  loadComments(parentID?: number) {
    if (!parentID) {
      parentID = 0;
    }
    const param = '?post=' + this.postID + '&parent=' + parentID;
    this.wpService.getComments(param).subscribe(data => {
      if (parentID > 0) {
        this.children = <ViewCommentResponse[]>data;
      }
      this.comments = <ViewCommentResponse[]>data;
      console.log(data);
    });
  }
}

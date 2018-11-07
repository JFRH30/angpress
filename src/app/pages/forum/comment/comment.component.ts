import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';
import { ViewCommentResponse } from 'src/app/models/wordpress.model';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class CommentComponent implements OnInit {
  @Input()
  postID: number;
  comments: ViewCommentResponse[];
  children: ViewCommentResponse[];

  constructor(private wpService: WordpressService) {}

  ngOnInit() {
    this.postID = 145;
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

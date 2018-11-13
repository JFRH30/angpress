import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'list-reply-component',
  templateUrl: './list-reply.component.html',
  styleUrls: ['./list-reply.component.scss'],
})
export class ListReplyComponent implements OnInit {
  @Input()
  postID: number;
  @Input()
  commentID: number;
  constructor() {}

  ngOnInit() {}
}

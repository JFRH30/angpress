import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { WordpressService } from 'src/app/services/wordpress.service';
import * as BallonEditor from '@ckeditor/ckeditor5-build-balloon';
import { DomSanitizer } from '@angular/platform-browser';
import { PageEvent } from '@angular/material';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ForumComponent implements OnInit {
  public Editor = BallonEditor;
  length: number;
  posts = <any>[];

  constructor(public wp: WordpressService, public sanitazer: DomSanitizer) {}

  ngOnInit() {
    this.wp.getPosts('?_embed=author&orderby=date').subscribe(posts => {
      this.length = parseInt(posts.headers.get('X-WP-Total'), 10);
      this.posts = posts.body;
    });
  }

  onSubmitPost(form) {
    console.log(form);
    form.value.status = 'publish';
    this.wp.createPost(form.value).subscribe(
      res => {
        this.posts.unshift(res);
      },
      err => console.log(err),
    );
    form.reset();
  }

  onPageChange(page: PageEvent) {
    const pageIndex = page.pageIndex + 1;
    this.wp
      .getPosts(`?_embed=author&orderby=date&page=${pageIndex}`)
      .subscribe(posts => {
        this.length = parseInt(posts.headers.get('X-WP-Total'), 10);
        this.posts = posts.body;
      });
  }
}

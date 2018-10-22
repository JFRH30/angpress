import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WordpressService } from 'src/app/services/wordpress.service';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit, OnChanges {
  posts;
  constructor(private wp: WordpressService) {
    this.wp.getPosts().subscribe(posts => (this.posts = posts));
  }

  ngOnInit() {}
  ngOnChanges() {
    this.wp
      .getPosts()
      .subscribe(posts => (this.posts = posts), err => console.log(err));
  }
}

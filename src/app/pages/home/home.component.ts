import { Component, OnInit, OnChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnChanges {
  posts;
  comments;
  constructor(private http: HttpClient) {
    this.http
      .get('http://localhost:8000/wordpress/wp-json/wp/v2/posts')
      .subscribe(res => (this.posts = <JSON>res));
    this.http
      .get('http://localhost:8000/wordpress/wp-json/wp/v2/comments')
      .subscribe(res => (this.comments = <JSON>res));
  }

  ngOnInit() {}

  ngOnChanges() {
    this.http
      .get('http://localhost:8000/wordpress/wp-json/wp/v2/posts')
      .subscribe(res => (this.posts = <JSON>res));
    this.http
      .get('http://localhost:8000/wordpress/wp-json/wp/v2/comments')
      .subscribe(res => (this.comments = <JSON>res));
  }
}

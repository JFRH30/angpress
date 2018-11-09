import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewPostResponse, CommentCreate } from 'src/app/models/wordpress.model';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {
  post: ViewPostResponse;
  constructor(private activatedRoute: ActivatedRoute, public app: AppService) {}

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    const param = '/' + this.activatedRoute.snapshot.params['id'] + '?_embed';
    this.app.wp.showPost(param).subscribe(data => {
      console.log(data.body);
      this.post = <ViewPostResponse>data.body;
    });
  }
}

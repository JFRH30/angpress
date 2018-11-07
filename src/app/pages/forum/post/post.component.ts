import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { WordpressService } from 'src/app/services/wordpress.service';
import {
  ViewPostResponse,
  CommentCreate,
} from 'src/app/models/wordpress.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {
  post: ViewPostResponse;
  constructor(
    private activatedRoute: ActivatedRoute,
    public wpService: WordpressService,
  ) {}

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    const param =
      '/' + this.activatedRoute.snapshot.params['id'] + '?_embed=author';
    this.wpService.getPosts(param).subscribe(data => {
      console.log(data.body);
      this.post = <ViewPostResponse>data.body;
    });
  }

  onSubmitComment(form) {
    const comment: CommentCreate = form.value;
    comment.post = this.post.id;
    comment.author = this.wpService.getID;
    this.wpService.createComment(comment).subscribe(data => {
      console.log(data);
      form.reset();
    });
  }
}

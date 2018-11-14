import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ViewPostResponse, CommentCreate } from 'src/app/models/wordpress.model';
import { AppService } from 'src/app/app.service';
import { windowWhen } from 'rxjs/operators';

@Component({
  selector: 'post-page',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PostComponent implements OnInit {
  showComment = false;
  editPost = false;
  post: ViewPostResponse;
  constructor(private activatedRoute: ActivatedRoute, public app: AppService) {}

  ngOnInit() {
    this.loadPost();
  }

  loadPost() {
    const param = '/' + this.activatedRoute.snapshot.params['id'] + '?_embed';
    this.app.wp.showPost(param).subscribe(
      (data) => {
        console.log(data.body);
        this.post = <ViewPostResponse>data.body;
      },
      (e) => this.app.errorLog(e, 'Show Post'),
    );
  }
  onDeletePost(id: number) {
    this.app.wp.deletePost(id, '?force=true').subscribe(
      (data) => {
        alert('Post is successfully deleted');
        this.app.router.navigate(['/forum']);
      },
      (e) => this.app.errorLog(e, 'Delete Post'),
    );
  }
}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';

// Component
import { ForumComponent } from './forum.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';
import { QuickPostComponent } from './quick-post/quick-post.component';
import { PostListComponent } from './post-list/post-list.component';
import { ContributorComponent } from './contributor/contributor.component';
import { CommentListComponent } from './comment-list/comment-list.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: ForumComponent,
      },
      {
        path: 'test',
        component: CommentComponent,
      },
      {
        path: ':slug',
        component: ForumComponent,
      },
      {
        path: 'post/:id',
        component: PostComponent,
      },
    ]),
    MaterialModule,
    FormsModule,
  ],
  declarations: [ForumComponent, PostComponent, CommentComponent, QuickPostComponent, PostListComponent, ContributorComponent, CommentListComponent],
})
export class ForumModule {}

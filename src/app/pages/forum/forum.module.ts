import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';

// Component
import { ForumComponent } from './forum.component';
import { PostComponent } from './post/post.component';
import { CommentComponent } from './comment/comment.component';

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
        path: ':name',
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
  declarations: [ForumComponent, PostComponent, CommentComponent],
})
export class ForumModule {}

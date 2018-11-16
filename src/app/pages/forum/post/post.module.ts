import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatTooltipModule } from '@angular/material';

// Component
import { PostComponent } from './post.component';

// Featured Module
import { CreateCommentModule } from 'src/app/shared/components/create-comment/create-comment.module';
import { EditPostModule } from 'src/app/shared/components/edit-post/edit-post.module';
import { ListCommentModule } from 'src/app/shared/components/list-comment/list-comment.module';
import { LoaderModule } from 'src/app/shared/components/loader/loader.module';

@NgModule({
  declarations: [PostComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: ':id',
        component: PostComponent,
      },
    ]),
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    CreateCommentModule,
    ListCommentModule,
    EditPostModule,
    LoaderModule,
  ],
})
export class PostModule {}

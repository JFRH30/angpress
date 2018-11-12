import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { MatProgressSpinnerModule } from '@angular/material';

// Component
import { ForumComponent } from './forum.component';

// Featured Module
import { CreatePostModule } from 'src/app/shared/components/create-post/create-post.module';
import { ListPostModule } from 'src/app/shared/components/list-post/list-post.module';
import { ContributorModule } from 'src/app/shared/components/contributor/contributor.module';

@NgModule({
  declarations: [ForumComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        component: ForumComponent,
      },
      {
        path: ':slug',
        component: ForumComponent,
      },
      {
        path: 'post',
        loadChildren: './post/post.module#PostModule',
      },
    ]),
    MatProgressSpinnerModule,
    CreatePostModule,
    ListPostModule,
    ContributorModule,
  ],
})
export class ForumModule {}

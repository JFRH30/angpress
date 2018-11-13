import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import {
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
} from '@angular/material';

// Component
import { ListCommentComponent } from './list-comment.component';

// Featured Module
import { CreateCommentModule } from '../create-comment/create-comment.module';

@NgModule({
  declarations: [ListCommentComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    CreateCommentModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
  ],
  exports: [ListCommentComponent],
})
export class ListCommentModule {}

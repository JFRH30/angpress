import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Component
import { ListReplyComponent } from './list-reply.component';

// Featured Module
import { CreateCommentModule } from '../create-comment/create-comment.module';
// import { ListCommentModule } from '../list-comment/list-comment.module';

@NgModule({
  declarations: [ListReplyComponent],
  imports: [CommonModule, CreateCommentModule],
  exports: [ListReplyComponent],
})
export class ListReplyModule {}

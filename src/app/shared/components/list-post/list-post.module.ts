import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCardModule, MatPaginatorModule, MatProgressSpinnerModule } from '@angular/material';

// Component
import { ListPostComponent } from './list-post.component';

@NgModule({
  declarations: [ListPostComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, MatCardModule, MatPaginatorModule, MatProgressSpinnerModule],
  exports: [ListPostComponent],
})
export class ListPostModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatCardModule, MatPaginatorModule } from '@angular/material';

// Component
import { ListPostComponent } from './list-post.component';
import { LoaderModule } from '../loader/loader.module';
import { FloatUpModule } from 'src/app/shared/components/float-up/float-up.module';

@NgModule({
  declarations: [ListPostComponent],
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    LoaderModule,
    FloatUpModule,
  ],
  exports: [ListPostComponent],
})
export class ListPostModule {}

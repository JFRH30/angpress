import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Component
import { HomeComponent } from './home.component';

// Featured Module
import { ListPostModule } from 'src/app/shared/components/list-post/list-post.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: HomeComponent,
      },
    ]),
    ListPostModule,
  ],
})
export class HomeModule {}

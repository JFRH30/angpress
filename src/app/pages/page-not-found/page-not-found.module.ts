import { NgModule } from '@angular/core';
import { PageNotFoundComponent } from './page-not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([{ path: '', component: PageNotFoundComponent }]),
  ],
  declarations: [PageNotFoundComponent],
})
export class PageNotFoundModule {}

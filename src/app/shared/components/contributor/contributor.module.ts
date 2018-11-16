import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatCardModule, MatTooltipModule } from '@angular/material';

// Component
import { ContributorComponent } from './contributor.component';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  declarations: [ContributorComponent],
  imports: [CommonModule, RouterModule, MatCardModule, MatTooltipModule, LoaderModule],
  exports: [ContributorComponent],
})
export class ContributorModule {}

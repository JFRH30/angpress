import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatCardModule, MatTooltipModule, MatProgressSpinnerModule } from '@angular/material';

// Component
import { ContributorComponent } from './contributor.component';

@NgModule({
  declarations: [ContributorComponent],
  imports: [CommonModule, RouterModule, MatCardModule, MatTooltipModule, MatProgressSpinnerModule],
  exports: [ContributorComponent],
})
export class ContributorModule {}

import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import {
  MatButtonModule,
  MatCardModule,
  MatDividerModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
} from '@angular/material';

// Component
import { CreateMediaComponent } from './create-media.component';

@NgModule({
  declarations: [CreateMediaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ScrollDispatchModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
  ],
  exports: [CreateMediaComponent],
})
export class CreateMediaModule {}

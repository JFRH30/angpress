import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { MatButtonModule, MatCardModule, MatDividerModule, MatIconModule, MatTooltipModule } from '@angular/material';

// Component
import { CreateMediaComponent } from './create-media.component';
import { LoaderModule } from '../loader/loader.module';

@NgModule({
  declarations: [CreateMediaComponent],
  imports: [
    CommonModule,
    FormsModule,
    ScrollDispatchModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatIconModule,
    MatTooltipModule,
    LoaderModule,
  ],
  exports: [CreateMediaComponent],
})
export class CreateMediaModule {}

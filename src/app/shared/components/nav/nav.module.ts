import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';

// Component
import { NavComponent } from './nav.component';

@NgModule({
  declarations: [NavComponent],
  imports: [CommonModule, RouterModule, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule],
  exports: [NavComponent],
})
export class NavModule {}

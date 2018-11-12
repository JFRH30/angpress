import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatIconModule, MatListModule, MatProgressSpinnerModule } from '@angular/material';

// Component
import { SidenavComponent } from './sidenav.component';

@NgModule({
  declarations: [SidenavComponent],
  imports: [CommonModule, RouterModule, MatIconModule, MatListModule, MatProgressSpinnerModule],
  exports: [SidenavComponent],
})
export class SidenavModule {}

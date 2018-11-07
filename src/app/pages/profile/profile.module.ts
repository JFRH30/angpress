import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';
import { FormsModule } from '@angular/forms';

// Component
import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './settings/settings.component';
import { AuthGuard } from 'src/app/services/auth.guard';
import { MediaComponent } from './media/media.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthGuard],
        component: ProfileComponent,
      },
      {
        path: 'settings',
        component: SettingsComponent,
      },
      {
        path: ':user',
        component: ProfileComponent,
      },
    ]),
    MaterialModule,
    FormsModule,
  ],
  declarations: [ProfileComponent, SettingsComponent, MediaComponent],
})
export class ProfileModule {}

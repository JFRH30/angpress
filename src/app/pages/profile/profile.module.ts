import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import {
  MatButtonModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatFormFieldModule,
  MatInputModule,
} from '@angular/material';

// Component
import { ProfileComponent } from './profile.component';

// Guard
import { AuthGuard } from 'src/app/services/auth.guard';

// Featured Module
import { CreatePostModule } from 'src/app/shared/components/create-post/create-post.module';
import { ListPostModule } from 'src/app/shared/components/list-post/list-post.module';
import { CreateMediaModule } from 'src/app/shared/components/create-media/create-media.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: '',
        canActivate: [AuthGuard],
        component: ProfileComponent,
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule',
      },
      {
        path: ':userID',
        component: ProfileComponent,
      },
    ]),
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CreatePostModule,
    ListPostModule,
    CreateMediaModule,
  ],
})
export class ProfileModule {}

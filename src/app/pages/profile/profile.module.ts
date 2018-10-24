import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatListModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { ProfileRouting } from './profile.routing';
import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProfileRouting,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatListModule,
    MatProgressSpinnerModule,
  ],
  declarations: [ProfileComponent, SettingsComponent],
})
export class ProfileModule {}

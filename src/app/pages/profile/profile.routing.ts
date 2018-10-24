import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { SettingsComponent } from './settings/settings.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', component: ProfileComponent },
      { path: 'settings', component: SettingsComponent },
    ]),
  ],
  exports: [RouterModule],
})
export class ProfileRouting {}

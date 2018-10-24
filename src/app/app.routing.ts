import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';
const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomeModule' },
  { path: 'forum', loadChildren: './pages/forum/forum.module#ForumModule' },
  { path: 'auth', loadChildren: './pages/auth/auth.module#AuthModule' },
  {
    path: 'profile',
    canActivate: [AuthGuard],
    loadChildren: './pages/profile/profile.module#ProfileModule',
  },
  {
    path: '**',
    loadChildren:
      './pages/page-not-found/page-not-found.module#PageNotFoundModule',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}

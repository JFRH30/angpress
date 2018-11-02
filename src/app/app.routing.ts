import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth.guard';

const routes: Routes = [
  { path: '', loadChildren: './pages/home/home.module#HomeModule' },
  {
    path: 'forum',
    loadChildren: './pages/forum/forum.module#ForumModule',
  },
  { path: 'login', loadChildren: './pages/login/login.module#LoginModule' },
  {
    path: 'register',
    loadChildren: './pages/register/register.module#RegisterModule',
  },
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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRouting } from './app.routing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatTabsModule,
  MatMenuModule,
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ForumComponent } from './pages/forum/forum.component';
import { WordpressService } from './services/wordpress.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PageNotFoundComponent,
    NavComponent,
    LoginComponent,
    RegisterComponent,
    ForumComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    AppRouting,
    MatTabsModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

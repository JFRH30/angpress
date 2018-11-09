import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRouting } from './app.routing';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';

// Component
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

// Service
import { AppService } from './app.service';

@NgModule({
  declarations: [AppComponent, NavComponent, SidenavComponent],
  imports: [BrowserModule, BrowserAnimationsModule, HttpClientModule, FormsModule, AppRouting, MaterialModule],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}

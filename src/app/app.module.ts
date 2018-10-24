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
  MatFormFieldModule,
  MatPaginatorModule,
  MatGridListModule,
  MatListModule,
  MatDividerModule,
  MatProgressSpinnerModule,
} from '@angular/material';

import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';

@NgModule({
  declarations: [AppComponent, NavComponent],
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
    MatFormFieldModule,
    MatPaginatorModule,
    MatGridListModule,
    MatListModule,
    MatDividerModule,
    MatProgressSpinnerModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

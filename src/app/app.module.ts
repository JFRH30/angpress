import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRouting } from './app.routing';

// Material
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material';

// Feature Module
import { NavModule } from './shared/components/nav/nav.module';
import { SidenavModule } from './shared/components/sidenav/sidenav.module';

// Component
import { AppComponent } from './app.component';

// Service
import { AppService } from './app.service';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRouting,
    BrowserAnimationsModule,
    MatSidenavModule,
    NavModule,
    SidenavModule,
  ],
  providers: [AppService],
  bootstrap: [AppComponent],
})
export class AppModule {}

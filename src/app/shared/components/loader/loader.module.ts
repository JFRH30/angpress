import { NgModule } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material';
import { LoaderComponent } from './loader.component';

@NgModule({
  declarations: [LoaderComponent],
  imports: [MatProgressSpinnerModule],
  exports: [LoaderComponent],
})
export class LoaderModule {}

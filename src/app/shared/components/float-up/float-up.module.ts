import { NgModule } from '@angular/core';
import { MatButtonModule, MatIconModule } from '@angular/material';
import { FloatUpComponent } from './float-up.component';

@NgModule({
  declarations: [FloatUpComponent],
  imports: [MatButtonModule, MatIconModule],
  exports: [FloatUpComponent],
})
export class FloatUpModule {}

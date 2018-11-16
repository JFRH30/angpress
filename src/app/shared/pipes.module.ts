import { NgModule } from '@angular/core';
import { EscapeHtmlPipe } from '../pipes/escape-html.pipe';

@NgModule({
  declarations: [EscapeHtmlPipe],
  exports: [EscapeHtmlPipe],
})
export class PipesModule {}

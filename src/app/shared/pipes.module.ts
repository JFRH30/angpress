import { NgModule } from '@angular/core';
import { EscapeHtmlPipe } from '../pipes/escape-html.pipe';
import { LoaderComponent } from './components/loader/loader.component';
import { FloatUpComponent } from './components/float-up/float-up.component';

@NgModule({
  declarations: [EscapeHtmlPipe, LoaderComponent, FloatUpComponent],
  exports: [EscapeHtmlPipe],
})
export class PipesModule {}

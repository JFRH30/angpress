import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'escapeHtml',
})
export class EscapeHtmlPipe implements PipeTransform {
  constructor(public santizer: DomSanitizer) {}

  transform(content: string) {
    return this.santizer.bypassSecurityTrustHtml(content);
  }
}

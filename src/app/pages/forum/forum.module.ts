import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForumRouting } from './forum.routing';
import { ForumComponent } from './forum.component';
import { FormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatButtonModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
} from '@angular/material';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { EscapeHtmlPipe } from 'src/app/pipes/escape-html.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ForumRouting,
    MatCardModule,
    MatButtonModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressSpinnerModule,
    CKEditorModule,
  ],
  declarations: [ForumComponent, EscapeHtmlPipe],
})
export class ForumModule {}

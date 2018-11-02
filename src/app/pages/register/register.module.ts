import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from 'src/app/shared/material.module';

// Component
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RegisterComponent,
      },
    ]),
    MaterialModule,
    FormsModule,
  ],
  declarations: [RegisterComponent],
})
export class RegisterModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpinnerComponent } from './spinner/spinner.component';
import { PageHeaderComponent } from './page-header/page-header.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SpinnerComponent, PageHeaderComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    MatIconModule,
    FlexLayoutModule,
    MatDialogModule,
    MatButtonModule,
  ],
  exports: [SpinnerComponent, PageHeaderComponent],
})
export class SharedModule {}

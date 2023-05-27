import { Component, Inject, inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})
export class ConfirmationDialogComponent implements OnInit {
  _dialogRef = inject(MatDialogRef<ConfirmationDialogComponent>);

  @Input() title: string = '';
  @Input() message: string = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ConfirmationDialogComponent
  ) {}

  ngOnInit(): void {
    this.title = this.data.title;
    this.message = this.data.message;
  }
  onConfirm(): void {
    // Close the dialog, return true
    this._dialogRef.close(true);
  }

  onDismiss(): void {
    // Close the dialog, return false
    this._dialogRef.close(false);
  }
}

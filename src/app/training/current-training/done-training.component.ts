import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-done-training',
  template: `<h2>Well Done! Keep Going!</h2>
  <mat-dialog-actions>
    <button mat-button [mat-dialog-close]="true">OK</button>
  </mat-dialog-actions>`
})
export class DoneTrainingComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public passedData: any) {
  }
}

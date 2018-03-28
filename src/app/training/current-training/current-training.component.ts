import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material';
import {StopTrainingComponent} from './stop-training.component';
import {TrainingService} from '../training.service';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';
import {take} from 'rxjs/operators/take';
import {DoneTrainingComponent} from './done-training.component';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {

  progress = 0;
  timer: any;

  constructor(private dialog: MatDialog,
              private trainingService: TrainingService,
              private store: Store<fromTraining.State>) {
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  startOrResumeTimer() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe(ex => {
      const step = ex.duration / 100 * 1000;
      this.timer = setInterval(() => {
        if (this.progress < 100) {
          this.progress = this.progress + 1;
        }
        if (this.progress === 100) {
          clearInterval(this.timer);
          const dialogRef  = this.dialog.open(DoneTrainingComponent);
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              this.trainingService.completeExercise();

            }
          });
        }
      }, step);
    });
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }
}

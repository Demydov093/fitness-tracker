import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainingService } from './training.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
})
export class TrainingComponent implements OnInit, OnDestroy {

  ongoingTraining  = false;
  exerciseSubsrption: Subscription;
  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubsrption = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if (exercise) {
          this.ongoingTraining = true;
        } else {
          this.ongoingTraining = false;
        }

      }
    );
  }
  ngOnDestroy() {
    if (this.exerciseSubsrption) {
      this.exerciseSubsrption.unsubscribe();
    }
  }

}

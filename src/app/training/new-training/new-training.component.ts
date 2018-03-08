import {Component, OnDestroy, OnInit} from '@angular/core';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UiService } from '../../shared/ui.service';


@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit, OnDestroy {

  constructor(private trainingService: TrainingService, private uiService: UiService) { }

  exercises: Exercise[];
  exerciseSubscription: Subscription;
  isLoading = false;
  private loadingSubscription: Subscription;

  ngOnInit() {
    this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
      this.isLoading = isLoading;
    })
   this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => (this.exercises = exercises));
   this.fetchExercises();
  }
  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises () {
    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
   this.exerciseSubscription.unsubscribe();
   this.loadingSubscription.unsubscribe();
  }
}

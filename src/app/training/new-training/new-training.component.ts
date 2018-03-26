import {Component, OnInit} from '@angular/core';
import {TrainingService} from '../training.service';
import {Exercise} from '../exercise.model';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import {UiService} from '../../shared/ui.service';
import {Observable} from 'rxjs/Observable';
import * as fromTraining from '../training.reducer';
import * as fromRoot from '../../app.reducer';
import {Store} from '@ngrx/store';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {

  constructor(private trainingService: TrainingService, private uiService: UiService, private store: Store<fromTraining.State>) {
  }

  exercises$: Observable<Exercise[]>;
  // exerciseSubscription: Subscription;
  isLoading$: Observable<boolean>;

  // private loadingSubscription: Subscription;

  ngOnInit() {
    // this.loadingSubscription = this.uiService.loadingStateChanged.subscribe(isLoading => {
    //   this.isLoading = isLoading;
    // })
    this.isLoading$ = this.store.select(fromRoot.getIsLoading);
    // this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(exercises => (this.exercises = exercises));
    this.exercises$ = this.store.select(fromTraining.getAvailableExercises);
    this.fetchExercises();
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }

  fetchExercises() {
    this.trainingService.fetchAvailableExercises();
  }

  // ngOnDestroy() {
  //  this.exerciseSubscription.unsubscribe();
  //  this.loadingSubscription.unsubscribe();
  // }
}

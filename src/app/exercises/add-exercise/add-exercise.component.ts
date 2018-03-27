import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AddExercise} from '../exercise.actions';
import {Exercise} from '../../training/exercise.model';
import {ExerciseService} from '../exercise.service';

@Component({
  selector: 'app-add-exercise',
  templateUrl: './add-exercise.component.html',
  styleUrls: ['./add-exercise.component.css']
})
export class AddExerciseComponent implements OnInit {

  constructor(private store: Store<any>, private exerciseService: ExerciseService) { }

  ngOnInit() {
  }

  onSubmit(form: NgForm) {

    const exercise = new Exercise(
      form.value.calories,
      form.value.duration,
      form.value.name,
      null,
      null,
      ''
    );
    form.resetForm();
    //
    // // this.addCar.emit(car);
    // this.store.dispatch(new AddExercise(exercise));
    if (exercise) {
      this.exerciseService.addExercise(exercise);
    }
  }
}

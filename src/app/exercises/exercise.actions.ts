import {Action} from '@ngrx/store';
import {Exercise} from '../training/exercise.model';


export namespace EXERCISE_ACTION {
  export const ADD_EXERCISE = 'ADD_EXERCISE';
  export const DELETE_EXERCISE = 'DELETE_EXERCISE';
}

export class AddExercise implements Action {
  readonly type = EXERCISE_ACTION.ADD_EXERCISE;

  constructor(public payload: Exercise) {
  }
}

export class DeleteExercise implements Action {
  readonly type = EXERCISE_ACTION.DELETE_EXERCISE;

  constructor(public payload: Exercise) {
  }
}

export type ExerciseAction = AddExercise | DeleteExercise;

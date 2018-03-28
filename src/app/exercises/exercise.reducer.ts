import {EXERCISE_ACTION, ExerciseAction} from './exercise.actions';
import {Exercise} from '../training/exercise.model';
import {createFeatureSelector, createSelector} from "@ngrx/store";

export interface ExerciseState {
  availableExercises: Exercise[];

}

const initialState: ExerciseState = {
  availableExercises: []
}

export function exerciseReducer(state = initialState, action: ExerciseAction) {
  switch (action.type) {
    case EXERCISE_ACTION.ADD_EXERCISE:
      return {
        ...state,
        availableExercises: [...state.availableExercises, action.payload]
      }
    case EXERCISE_ACTION.DELETE_EXERCISE:
      return {
        ...state,
        availableExercises: [...state.availableExercises.filter(c => c.id !== action.payload.id)]
      }
    default:
      return state;
  }
}

export const getExerciseState = createFeatureSelector<ExerciseState>('exercise');


export const getAvailableExercises = createSelector(getExerciseState, (state: ExerciseState) => state.availableExercises);

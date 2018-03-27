import {EXERCISE_ACTION, ExerciseAction} from './exercise.actions';
import {Exercise} from '../training/exercise.model';

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
        availableExercises: [...state.availableExercises.filter( c => c.id !== action.payload.id)]

      }
    default:
      return state;
  }
}

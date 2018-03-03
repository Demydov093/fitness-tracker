import {Exercise} from './exercise.model';
import {Subject} from 'rxjs/Subject';

export class  TrainingService {
  private availableExercise: Exercise[] = [
    {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
    {id: 'touch-toes', name: 'Touch Toes', duration: 100, calories: 15},
    {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
    {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  ];
  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  getAvailableExercises() {
    return this.availableExercise.slice();
  }

  startExercise(selectedId: string) {
    this.runningExercise = this.availableExercise.find( ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }
}

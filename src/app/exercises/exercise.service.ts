import { Injectable } from '@angular/core';
import {Exercise} from '../training/exercise.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {UiService} from "../shared/ui.service";

@Injectable()
export class ExerciseService {

  constructor(private db: AngularFirestore, private uiService: UiService) { }

  addExercise(exercise) {
    this.addDataToDatabase({...exercise});
    // this.runningExercise = null;
    // this.exerciseChanged.next(null);
    this.uiService.showSnackbar(`${exercise.name} added`, null, 3000);
  }
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('availableExercises').add(exercise);
  }

}

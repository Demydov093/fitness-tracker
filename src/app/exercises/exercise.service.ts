import {Injectable} from '@angular/core';
import {Exercise} from '../training/exercise.model';
import {AngularFirestore} from 'angularfire2/firestore';
import {UiService} from '../shared/ui.service';

import {Store} from '@ngrx/store';
import * as fromExercise from '../exercises/exercise.reducer';
import * as UI from '../shared/ui.actions';


@Injectable()
export class ExerciseService {

  constructor(private db: AngularFirestore,
              private uiService: UiService,
              private store: Store<fromExercise.ExerciseState>) {
    this.store.select(fromExercise.getAvailableExercises).subscribe((ex) => {
      if (ex[0]) {
        this.store.dispatch(new UI.StartLoading());
        this.addDataToDatabase({...ex[0]});
      }
    }, error => {
      this.uiService.showSnackbar(error.message, null, 3000);
    });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('availableExercises').add(exercise)
      .then(() => {
        this.uiService.showSnackbar(`${exercise.name} added`, null, 3000);
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(
        (err) => {this.uiService.showSnackbar(err.message, null, 3000)
          this.store.dispatch(new UI.StopLoading());
        });
  }
}


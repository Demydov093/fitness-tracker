import {Exercise} from './exercise.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from 'rxjs/Subscription';
import {UiService} from '../shared/ui.service';
import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as fromTraining from './training.reducer';
import * as Training from './training.action';
import * as UI from '../shared/ui.actions';
import * as Auth from '../auth/auth.actions';
import {take} from 'rxjs/operators/take';
import {getFinishedExercises} from './training.reducer';


@Injectable()
export class TrainingService {
  // private availableExercise: Exercise[] = [
  //   {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
  //   {id: 'touch-toes', name: 'Touch Toes', duration: 100, calories: 15},
  //   {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
  //   {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  // ];
  // private runningExercise: Exercise;
  // private finidhedExercises: Exercise[] = [];
  // exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  // finishedExercisesChanged = new Subject<Exercise[]>();

  private fbSubscription: Subscription[] = [];

  // private availableExercise: Exercise[] = [];
  userId: string;

  constructor(private db: AngularFirestore,
              private uiService: UiService,
              private store: Store<fromTraining.State>) {
  }

  fetchAvailableExercises() {
    // this.uiService.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubscription.push(this.db
      .collection('availableExercises')
      .snapshotChanges()
      .map(docArray => {
        return docArray.map(doc => {
          return {
            id: doc.payload.doc.id,
            name: doc.payload.doc.data().name,
            duration: doc.payload.doc.data().duration,
            calories: doc.payload.doc.data().calories
          };
        });
      }).subscribe((exercises: Exercise[]) => {
        // this.availableExercise = exercises;
        // this.exercisesChanged.next([ ...this.availableExercise]);
        // this.uiService.loadingStateChanged.next(false);
        this.store.dispatch(new Training.SetAvailableTrainings(exercises));
        this.store.dispatch(new UI.StopLoading());
      }, error => {
        this.store.dispatch(new UI.StopLoading());
        // this.uiService.loadingStateChanged.next(false);
        this.uiService.showSnackbar('Load failed, try again', null, 3000);
        // this.exercisesChanged.next(null);
      }));
  }

  startExercise(selectedId: string) {
    // this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});
    //
    // this.runningExercise = this.availableExercise.find( ex => ex.id === selectedId);
    // this.exerciseChanged.next({ ...this.runningExercise });
    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((ex) => {
      this.addDataToDatabase({...ex, date: new Date, state: 'completed'});
      // this.runningExercise = null;
      // this.exerciseChanged.next(null);
      this.store.dispatch(new Training.StopTraining());
    });
  }

  cancelExercise(progress: number) {
    this.store.select(fromTraining.getActiveTraining).pipe(take(1)).subscribe((ex) => {
      this.addDataToDatabase({
        ...ex,
        duration: ex.duration * (progress / 100),
        calories: ex.calories * (progress / 100),
        date: new Date,
        state: 'cancelled',
      });
      // this.runningExercise = null;
      // this.exerciseChanged.next(null);
      this.store.dispatch(new Training.StopTraining());
    });
  }

  // getRuuningExercise() {
  //   return { ...this.runningExercise };
  // }
  fetchCompletedOrCancelledExercises() {
    this.fbSubscription.push(this.db
      .collection('finishedExercises' + this.userId)
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
        // this.finishedExercisesChanged.next(exercises);
        this.store.dispatch(new Training.SetFinishedTrainings(exercises));
      }));
  }

  getUserId(id) {
    this.userId = id;
  }

  cancelSubscriptions() {
    this.fbSubscription.forEach(sub => {
      sub.unsubscribe();
    });
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises' + this.userId).add(exercise);
  }

}

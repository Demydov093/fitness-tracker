import {Exercise} from './exercise.model';
import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import {AngularFirestore} from 'angularfire2/firestore';
import {Subscription} from "rxjs/Subscription";



@Injectable()
export class  TrainingService {
  // private availableExercise: Exercise[] = [
  //   {id: 'crunches', name: 'Crunches', duration: 30, calories: 8},
  //   {id: 'touch-toes', name: 'Touch Toes', duration: 100, calories: 15},
  //   {id: 'side-lunges', name: 'Side Lunges', duration: 120, calories: 18},
  //   {id: 'burpees', name: 'Burpees', duration: 60, calories: 8}
  // ];
  private runningExercise: Exercise;
  private finidhedExercises: Exercise[] = [];
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private fbSubscription: Subscription[] = [];

  private availableExercise: Exercise[] = [];

  constructor(private db: AngularFirestore) {}

  fetchAvailableExercises() {
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
      this.availableExercise = exercises;
      this.exercisesChanged.next([ ...this.availableExercise]);
    }));
  }

  startExercise(selectedId: string) {
    this.db.doc('availableExercises/' + selectedId).update({lastSelected: new Date()});

    this.runningExercise = this.availableExercise.find( ex => ex.id === selectedId);
    this.exerciseChanged.next({ ...this.runningExercise });
  }
  completeExercise() {
    this.addDataToDatabase({ ...this.runningExercise, date: new Date, state: 'completed'});
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      duration: this.runningExercise.duration * (progress / 100),
      calories: this.runningExercise.calories * (progress / 100),
      date: new Date(),
      state: 'cancelled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }
  getRuuningExercise() {
    return { ...this.runningExercise };
  }

  fetchCompletedOrCancelledExercises() {
    this.fbSubscription.push(this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercise[]) => {
         this.finishedExercisesChanged.next(exercises);
      }));
  }
  cancelSubscriptions() {
    this.fbSubscription.forEach( sub => {
      sub.unsubscribe();
    });
  }
  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

}

import { Subject } from 'rxjs/Subject';
import { AuthData } from './auth-data.model';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { TrainingService } from '../training/training.service';
import { UiService } from '../shared/ui.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import * as UI from '../shared/ui.actions';
import * as Auth from './auth.actions';
import {AngularFirestore} from "angularfire2/firestore";
import {Subscription} from "rxjs/Subscription";
import {User} from "./user.model";

@Injectable()
export class AuthService {
  // authChange = new Subject<boolean>();
  // private isAuthenticated = false;
  userSet = new Subject<any>();

  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UiService,
    private store: Store<fromRoot.State>,
    private db: AngularFirestore,
  ) {}
  private fbSubscription: Subscription[] = [];
  userName: string;

  initAuthlistener() {
    this.afAuth.authState.subscribe( user => {
      if (user) {
        // this.isAuthenticated = true;
        this.store.dispatch(new Auth.SetAuthenticated());
        // this.authChange.next(true);
        this.trainingService.getUserId(user.uid);
        this.userSet.next(user);
        this.router.navigate(['/']);
      } else {
        this.trainingService.cancelSubscriptions();
        this.store.dispatch(new Auth.SetUnauthenticated());
        // this.isAuthenticated = false;
        // this.authChange.next(false);
        this.router.navigate(['/login']);
      }
    });
  }

  registerUser(authData: AuthData, form) {
   // this.uiService.loadingStateChanged.next(true);
   this.store.dispatch(new UI.StartLoading());
   this.afAuth.auth.createUserWithEmailAndPassword(authData.email, authData.password)
     .then( result => {
       result.updateProfile({
         displayName: form.value.name,
       });
       // this.uiService.loadingStateChanged.next(false);
       this.store.dispatch(new UI.StopLoading());
     })
     .catch(error => {
       this.store.dispatch(new UI.StopLoading());
       // this.uiService.loadingStateChanged.next(false);
       this.uiService.showSnackbar(error.message, null, 3000);
     });
      this.afAuth.auth.onAuthStateChanged( (user) => {
        if (user) {
          this.userName = user.displayName;
        }
      });
  }
  login(authData: AuthData) {
   // this.store.dispatch({type: 'START_LOADING'});
   this.store.dispatch(new UI.StartLoading());
   // this.uiService.loadingStateChanged.next(true);
   this.afAuth.auth.signInWithEmailAndPassword(authData.email, authData.password)
   .then(result => {
     this.store.dispatch(new UI.StopLoading());
     // this.uiService.loadingStateChanged.next(false);
   })
   .catch(error => {
     this.store.dispatch(new UI.StopLoading());
     // this.uiService.loadingStateChanged.next(false);
     this.uiService.showSnackbar(error.message, null, 3000);
   });
    this.afAuth.auth.onAuthStateChanged( (user) => {
      if (user) {
        this.userName = user.displayName;
      }
    });
  }
  getUserName() {
    return this.userName;
  }
  logout() {
    this.afAuth.auth.signOut();
  }

  // isAuth() {
  //   return this.isAuthenticated;
  // }


}

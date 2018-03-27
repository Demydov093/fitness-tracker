import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MaterialModule} from './material.module';
import {WelcomeComponent} from './welcome/welcome.component';
import {AppRoutingModule} from './app-routing.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {HeaderComponent} from './navigation/header/header.component';
import {SidenavListComponent} from './navigation/sidenav-list/sidenav-list.component';

// Service
import {AuthService} from './auth/auth.service';
import {TrainingService} from './training/training.service';
import {UiService} from './shared/ui.service';

// Firebase
import {AngularFireModule} from 'angularfire2';
import {environment} from '../environments/environment';

import {AuthModule} from './auth/auth.module';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {StoreModule} from '@ngrx/store';
import {reducers} from './app.reducer';
import {ExerciseModule} from './exercises/exercise.module';
import {ExerciseService} from "./exercises/exercise.service";

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    SidenavListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    AppRoutingModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AuthModule,
    ExerciseModule,
    AngularFirestoreModule,
    StoreModule.forRoot(reducers)

  ],
  providers: [AuthService, TrainingService, UiService, ExerciseService],
  bootstrap: [AppComponent]
})
export class AppModule {
}

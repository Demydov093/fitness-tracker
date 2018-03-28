import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AddExerciseComponent} from './add-exercise/add-exercise.component';
import {StoreModule} from '@ngrx/store';
import {exerciseReducer} from './exercise.reducer';

@NgModule({
  declarations: [
    AddExerciseComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    StoreModule.forFeature('exercise', exerciseReducer)
  ]
})
export class ExerciseModule {
}

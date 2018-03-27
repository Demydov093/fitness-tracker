import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import {Store} from '@ngrx/store';
import * as fromRoot from '../app.reducer';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  isAuth$: Observable<boolean>;

  constructor(private router: Router, private store: Store<fromRoot.State>) {
  }

  ngOnInit() {
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }
  start() {
    this.router.navigateByUrl('/training');
  }
  exercise() {
    this.router.navigateByUrl('/exercise');
  }
}

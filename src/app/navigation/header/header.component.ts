import {Component, OnInit, EventEmitter, Output} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {Subscription} from 'rxjs/Subscription';

import {Store} from '@ngrx/store';
import * as fromRoot from '../../app.reducer';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Output() sidenavToggle = new EventEmitter<void>();
  isAuth$: Observable<boolean>;
  authSubscription: Subscription;
  userSubscription: Subscription;
  user: string;

  constructor(private store: Store<fromRoot.State>, private authService: AuthService) {
  }

  ngOnInit() {
    // this.authSubscription = this.authService.authChange.subscribe( authStatus => {
    //  this.isAuth = authStatus;
    // });

    this.userSubscription = this.authService.userSet.subscribe(user => {
      if (user.displayName !== null) {
        this.user = user.displayName;
      }
    });
    this.isAuth$ = this.store.select(fromRoot.getIsAuth);
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  onLogout() {
    this.authService.logout();
  }

  // ngOnDestroy() {
  //  this.authSubscription.unsubscribe();
  // }
}

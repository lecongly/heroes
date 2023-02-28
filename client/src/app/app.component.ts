import {Component, OnInit} from '@angular/core';
import {User} from './core/interface/user.interface';
import {select, Store} from '@ngrx/store';
import {heroesSelector} from './core/store/hero/hero.selector';
import {userSelector} from './core/store/auth/auth.selector';
import {logout} from './core/store/auth/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Angular Tour Of Heroes with Bootstap';
  user: User | null;

  logout() {
    this.store.dispatch(logout())
  }

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.pipe(select(userSelector)).subscribe(user => this.user = user)
  }
}

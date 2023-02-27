import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {select, Store} from '@ngrx/store';
import {heroesSelector, heroStatusSelector} from '../core/store/hero/hero.selector';
import {getHeroes} from '../core/store/hero/hero.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[] = [];
  status$: Observable<string>

  constructor(private store: Store) {
  }

  ngOnInit(): void {
    this.store.dispatch(getHeroes())
    this.store.pipe(select(heroStatusSelector))
    this.store.pipe(select(heroesSelector)).subscribe(heroes => this.heroes = heroes.slice(0, 4))
  }
}

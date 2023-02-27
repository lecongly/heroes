import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../core/services/hero/hero.service';
import {select, Store} from '@ngrx/store';
import {deleteHero, getHeroes} from '../core/store/hero/hero.actions';
import {heroesSelector, heroStatusSelector} from '../core/store/hero/hero.selector';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];
  status$: Observable<string>;

  constructor(public heroService: HeroService, private store: Store) {
  }

  ngOnInit(): void {
    this.getHeroes();
    this.status$ = this.store.select(heroStatusSelector);
  }

  getHeroes(): void {
    this.store.dispatch(getHeroes())
    this.store.pipe(select(heroesSelector)).subscribe(heroes => this.heroes = heroes)
  }

  delete(hero: Hero): void {
    this.store.dispatch(deleteHero({id: hero._id}))
  }
}

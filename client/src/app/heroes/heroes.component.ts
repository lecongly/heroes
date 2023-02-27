import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../core/services/hero/hero.service';
import {MessageService} from '../message.service';
import {select, Store} from '@ngrx/store';
import {deleteHero, getHeroes} from '../core/store/hero/hero.actions';
import {heroesSelector} from '../core/store/hero/hero.selector';

interface HeroListVm {
  heroes: Hero[];
  isLoading: boolean;
}

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(public heroService: HeroService, private store: Store) {
  }

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.store.dispatch(getHeroes())
    this.store.pipe(select(heroesSelector)).subscribe(heroes => this.heroes = heroes)
  }

  delete(hero: Hero): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero._id).subscribe();
    this.store.dispatch(deleteHero({id: hero._id}))
  }
}

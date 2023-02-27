import {Component, Input} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../core/services/hero/hero.service';
import {Store} from '@ngrx/store';
import {createHero} from '../core/store/hero/hero.actions';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {
  @Input() heroes: Hero[] = []

  constructor(public heroService: HeroService, private store: Store) {
  }

  add(name: string): void {
    if (!name) {
      return;
    }
    name = name.trim();

    this.store.dispatch(createHero({name}))

    
  }

}

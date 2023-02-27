import {Component, Input, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {select, Store} from '@ngrx/store';
import {getHero, updateHero} from '../core/store/hero/hero.actions';
import {currentHeroSelector} from '../core/store/hero/hero.selector';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HeroService} from '../core/services/hero/hero.service';
import {Observable} from 'rxjs';
import {AppState} from '../core/store/app.state';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  currentHero$: Observable<Hero | null>;
  updatedHero: Hero = {_id: '', name: '', gender: false, mail: '', age: 0, address: ''};

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>,
    private fb: FormBuilder
  ) {
    let id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(getHero({id}));
    this.currentHero$ = this.store.pipe(select(currentHeroSelector));
  }

  ngOnInit(): void {
    this.currentHero$.subscribe(hero => {
      if (hero) {
        this.updatedHero = {...hero};
      }
    });
  }

  updateHero(): void {
    console.log(this.updatedHero)
    this.store.dispatch(updateHero({hero: this.updatedHero}));
    this.goBack()
  }


  goBack(): void {
    this.location.back();
  }
}

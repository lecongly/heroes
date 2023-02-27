import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {select, Store} from '@ngrx/store';
import {getHero, updateHero} from '../core/store/hero/hero.actions';
import {currentHeroSelector, heroStatusSelector} from '../core/store/hero/hero.selector';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AppState} from '../core/store/app.state';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  heroForm!: FormGroup;
  hero!: Hero;
  status$: Observable<string>;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store<AppState>,
    private formBuilder: FormBuilder
  ) {
    let id = this.route.snapshot.paramMap.get('id')!;
    this.store.dispatch(getHero({id}));

  }

  ngOnInit(): void {
    this.heroForm = this.formBuilder.group({
      name: ['', Validators.required],
      gender: [],
      mail: ['', Validators.email],
      age: ['', Validators.min(0)],
      address: ['']
    });
    this.store.pipe(select(currentHeroSelector)).subscribe(hero => {
      if (hero) {
        this.hero = hero
        this.heroForm.patchValue({
          name: hero.name,
          gender: hero.gender,
          mail: hero.mail,
          age: hero.age,
          address: hero.address
        });
      }
    })
    this.status$ = this.store.select(heroStatusSelector);
  }

  onSubmit(): void {
    const updatedHero = {...this.hero, ...this.heroForm.value};
    this.store.dispatch(updateHero({hero: updatedHero}));
    this.goBack()
  }

  goBack(): void {
    this.location.back();
  }
}

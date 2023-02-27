import {Component, Input} from '@angular/core';
import {Hero} from '../hero';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

import {select, Store} from '@ngrx/store';
import {getHero, updateHero} from '../core/store/hero/hero.actions';
import {currentHeroSelector} from '../core/store/hero/hero.selector';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HeroService} from '../core/services/hero/hero.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent {
  hero: Hero | null
  heroForm: Hero | null

  form: FormGroup;

  get email() {
    return this.form.get('email')
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store,
    private formBuilder: FormBuilder,
    private heroService: HeroService
  ) {
    this.form = formBuilder.group({
      name: "",
      email: ["", Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")],
      gender: "",
      age: "",
      address: "",
    });
    if (this.hero) {
      this.heroForm = {...this.hero}
    }
  }

  ngOnInit(): void {
    this.getHero();
  }


  getHero(): void {
    const id = this.route.snapshot.paramMap.get('id')!

    this.store.dispatch(getHero({id}))

    this.store.pipe(select(currentHeroSelector)).subscribe(hero => this.hero = hero)
    // this.heroService.getHero(id)
    //   .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      // this.heroService.updateHero(this.hero)
      //   .subscribe(() => this.goBack());
      console.log(this.hero)
      // this.store.dispatch(updateHero(this.hero))

    }
  }
}

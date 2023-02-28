import {NgModule} from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {EffectsModule} from '@ngrx/effects';
import {heroReducer} from '../store/hero/hero.reducer';
import {HeroEffects} from '../store/hero/hero.effects';
import {authReducer} from '../store/auth/auth.reducer';
import {AuthEffects} from '../store/auth/auth.effects';

@NgModule({
  imports: [
    StoreModule.forFeature('feature_hero', heroReducer),
    StoreModule.forFeature('feature_auth', authReducer),
    EffectsModule.forFeature([HeroEffects, AuthEffects])
  ]
})

export class CoreModule {

}

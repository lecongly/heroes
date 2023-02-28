import {HeroState} from './hero/hero.state';
import {AuthState} from './auth/auth.state';

export interface AppState {
  feature_hero: HeroState,
  feature_auth: AuthState
}

import {Hero} from '../../../hero';

export interface HeroState {
  items: Hero[];
  status: 'idle' | 'loading' | 'loaded' | 'error'
  error?: string
  currentItem: Hero | null
}

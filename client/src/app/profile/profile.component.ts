import {Component, OnInit} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {User} from '../core/interface/user.interface';
import UserService from '../core/services/user/user.service';
import {ActivatedRoute} from '@angular/router';
import {HeroService} from '../core/services/hero/hero.service';
import {Hero} from '../hero';
import {userSelector} from '../core/store/auth/auth.selector';
import {fetchUser} from '../core/store/auth/auth.actions';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User
  heroes: Hero[]
  userStore: User | null
  isMyProfile: boolean = false

  ngOnInit(): void {
    let userId = this.route.snapshot.paramMap.get('userId')!;
    this.userService.getUserById(userId).subscribe(user => this.user = user)
    this.heroService.getHeroesByUserId(userId).subscribe(heroes => this.heroes = heroes)
    this.store.pipe(select(userSelector)).subscribe(user => this.userStore = user)
    this.isMyProfile = this.userStore?._id === userId
  }

  constructor(private route: ActivatedRoute,
              private store: Store,
              private userService: UserService,
              private heroService: HeroService) {

  }
}

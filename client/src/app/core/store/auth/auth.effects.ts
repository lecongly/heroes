import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import AuthService from '../../services/auth/auth.service';
import * as authActions from './auth.actions'
import {catchError, exhaustMap, map, of} from 'rxjs';

@Injectable()
export class AuthEffects {
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.register),
      exhaustMap((action) =>
        this.authService.register(action.name, action.email, action.password).pipe(
          map((response) => authActions.registerSuccess({user: response.user})),
          catchError((error) => of(authActions.registerFailed({error: error.message})))
        )
      )
    )
  );
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType((authActions.login)),
      exhaustMap((action) =>
        this.authService.login(action.email, action.password).pipe(
          map((response) => authActions.loginSuccess({user: response.user})),
          catchError((error) => of(authActions.loginFailed({error: error.message})))
        )
      )
    )
  )
  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(authActions.logout),
      exhaustMap(() =>
        this.authService.logout().pipe(
          map(() => authActions.logoutSuccess())
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService
  ) {
  }
}

import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import AuthService from '../../core/services/auth/auth.service';
import {Store} from '@ngrx/store';
import {login, register} from '../../core/store/auth/auth.actions';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {
  signInForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private store: Store
  ) {
    this.signInForm = this.fb.group({
      email: new FormControl(),
      password: new FormControl(),
    });
  }

  loginUser() {
    const {email, password} = this.signInForm.value
    this.store.dispatch(login({email, password}))
    // this.router.navigateByUrl("/")
  }
}

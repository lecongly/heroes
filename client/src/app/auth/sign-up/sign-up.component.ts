import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {Router} from '@angular/router';
import AuthService from '../../core/services/auth/auth.service';
import {Store} from '@ngrx/store';
import {register} from '../../core/store/auth/auth.actions';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signUpForm: FormGroup;

  constructor(
    public fb: FormBuilder,
    public authService: AuthService,
    public router: Router,
    private store: Store
  ) {
    this.signUpForm = this.fb.group({
      name: new FormControl(),
      email: new FormControl(),
      password: new FormControl(),
    });
  }


  registerUser() {
    const {name, email, password} = this.signUpForm.value
    this.store.dispatch(register({name, email, password}))
  }
}

import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, tap} from 'rxjs';
import {User, UserResponse} from '../../interface/user.interface';
import {Hero} from '../../../hero';

@Injectable({
  providedIn: 'root'
})

export default class AuthService {
  private authUrl = 'http://localhost:5000/api/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'Application/json'})
  }

  constructor(
    private http: HttpClient
  ) {
  }

  register(name: string, email: string, password: string) {
    const body = {name, email, password};
    const url = `${this.authUrl}/register`
    return this.http.post<UserResponse>(url, body, this.httpOptions).pipe(
      tap(res => localStorage.setItem('token', res.token))
    )

  }

  login(email: string, password: string): Observable<UserResponse> {
    const body = {email, password};
    const url = `${this.authUrl}/login`
    return this.http.post<UserResponse>(url, body, this.httpOptions).pipe(
      tap(res => localStorage.setItem('token', res.token))
    );
  }

  logout(): Observable<boolean> {
    localStorage.removeItem('token'); // remove the token from local storage
    return of(true); // Return an observable with the logout status
  }


  fetchUser(token: string): Observable<User> {
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<User>(`${this.authUrl}/me`, {headers});
  }
}

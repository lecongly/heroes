import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../interface/user.interface';

@Injectable({
  providedIn: 'root'
})

export default class UserService {
  private authUrl = 'http://localhost:3000/api/users';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'Application/json'})
  }

  constructor(
    private http: HttpClient
  ) {
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(`${this.authUrl}/${userId}`);
  }
}

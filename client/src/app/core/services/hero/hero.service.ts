import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Hero} from '../../../hero';

@Injectable({
  providedIn: 'root'
})

export class HeroService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'Application/json'})
  }

  private heroesUrl = 'http://localhost:5000/api/heroes';

  constructor(
    private http: HttpClient,
  ) {
  }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl)
  }

  getHeroesByUserId(userId: string): Observable<Hero[]> {
    return this.http.get<Hero[]>(`${this.heroesUrl}/${userId}`)
  }

  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url)
  }

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero._id}`;
    console.log(hero)
    return this.http.put<Hero>(url, hero, this.httpOptions)
  }

  addHero(name: string): Observable<Hero> {
    console.log("addHero service", name)
    return this.http.post<Hero>(this.heroesUrl, {name}, this.httpOptions)
  }

  deleteHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions)
  }


  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/search?name=${term}`)
  }
}

import {MessageService} from '../../../message.service';

import {Injectable} from '@angular/core';
import {catchError, Observable, of, tap} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Hero} from '../../../hero';

@Injectable({
  providedIn: 'root'
})

export class HeroService {

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'Application/json'})
  }
  private apiUrl = 'http://localhost:5000/api/heroes';

  private heroesUrl = 'http://localhost:5000/api/heroes';

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {
  }

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  // private handleError<T>(operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //
  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);
  //
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  getHeroes(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.apiUrl).pipe(
      tap(_ => this.log('Fetched heroes')),
      // catchError(this.handleError<Hero[]>('getHeroes', []))
    )
  }

  getHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url).pipe(
      tap(_ => this.log(`Fetched hero id=${id}`)),
      // catchError(this.handleError<Hero>(`getHero id=${id}`))
    );
  }

  updateHero(hero: Hero): Observable<Hero> {
    const url = `${this.heroesUrl}/${hero._id}`;
    console.log(hero)
    return this.http.put<Hero>(url, hero, this.httpOptions).pipe(
      tap(_ => this.log(`updated hero id=${hero._id}`)),
      // catchError(this.handleError<any>('updateHero'))
    )
  }

  addHero(name: string): Observable<Hero> {
    console.log("addHero service", name)
    return this.http.post<Hero>(this.heroesUrl, {name}, this.httpOptions).pipe(
      tap((newHero: Hero) => this.log(`Add hero w/ id=${newHero._id}`)),
      // catchError(this.handleError<Hero>('addHero'))
    )
  }

  deleteHero(id: string): Observable<Hero> {
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions).pipe(
      tap(_ => this.log(`Deleted hero id=${id}`)),
      // catchError(this.handleError<Hero>('deleteHero'))
    );
  }


  searchHeroes(term: string): Observable<Hero[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.heroesUrl}/search?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      // catchError(this.handleError<Hero[]>('searchHeroes', []))
    );
  }
}

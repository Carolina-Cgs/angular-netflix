import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { GENRES } from './mockGenres';
import { Observable, of } from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';



@Injectable({
  providedIn: 'root'
})
export class GenreService {
  genres: Genre[];
  selectedGenre: Genre;
  newGenre: Genre = {
    name: '',
    created_by: 0
  }

  constructor(private http: HttpClient,
    private localStorage: LocalStorageService,
    private userService: UserService) { }

  getGenres(): Observable<Genre[]> {
    if (this.genres) {
      return of(this.genres);
    } else {
      const result = this.http.get<Genre[]>('http://netflix.cristiancarrino.com/genre/read.php');
      result.subscribe(
        response => this.genres = response
      )
      return result;
    }
  }

  addGenre() {
    if (!this.userService.loggedUser) {
      alert('Errore: devi effettuare il login');
      return;
    }

    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.loggedUser.token
      })
    };
    this.newGenre.created_by = this.userService.loggedUser.id;
     this.http.post<Genre[]>(
       'http://netflix.cristiancarrino.com/actor/create.php',
       this.newGenre,
       httpOptions).subscribe(response => {
         this.getGenres().subscribe(response =>
          this.genres = response);
     })
    this.newGenre = {
      name: '',
      created_by: 0
    }
  }
 
  editGenre(): void {
    this.localStorage.store('genres', this.genres);
    this.selectedGenre = null;
  }
  
}

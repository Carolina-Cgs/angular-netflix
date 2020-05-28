import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { GENRES } from './mockGenres';
import { Observable, of } from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class GenreService {
  genres: Genre[]; // copia del mock
  selectedGenre: Genre;
  newGenre: Genre = {
    name: ''
  }

  constructor(private http: HttpClient, private localStorage: LocalStorageService) { }

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

  addGenre(genre: Genre) {
    this.genres.push(this.newGenre);
    this.localStorage.store('genres', this.genres);
    this.newGenre = {
      name: '',
    }
  }

  editGenre(): void {
    this.localStorage.store('genres', this.genres);
    this.selectedGenre = null;
  }
  
}

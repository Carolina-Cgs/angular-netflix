import { Injectable } from '@angular/core';
import { Genre } from '../models/genre';
import { GENRES } from './mockGenres';
import { Observable, of } from 'rxjs';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';


@Injectable({
  providedIn: 'root'
})
export class GenreService {
  genres: Genre[]; // copia del mock
  selectedGenre: Genre;
  newGenre: Genre = {
    name: ''
  }

  constructor(private localStorage:LocalStorageService) { }

  getGenres(): Genre[] {
    this.genres = this.localStorage.retrieve('genres') || GENRES;
    return this.genres;
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

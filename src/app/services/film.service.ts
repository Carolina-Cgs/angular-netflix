import { Injectable } from '@angular/core';
import { Film } from '../models/film';
import { FILMS } from './mockFilms';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films: Film[]; // copia del mock
  selectedFilm: Film;
  newFilm: Film = {
    title: '',
    description: '',
    director: '',
    duration: '',
    releaseYear: null,
    stars: null,
    cast: [],
    genres: [],
    tags: '',
  }

  constructor(private localStorage:LocalStorageService) { }


  getFilms(): Film[] {
    this.films = this.localStorage.retrieve('films') || FILMS;
    return this.films;
  }

   addFilm() {
    if(!this.films) {
      this.films = this.getFilms();
    }

    this.films.push(this.newFilm);
    this.localStorage.store('films', this.films);
    this.newFilm = {
      title: '',
      description: '',
      director: '',
      duration: '',
      releaseYear: null,
      stars: null,
      cast: [],
      genres: [],
      tags: '',
    }
  }
   
  editFilm(): void {
      this.localStorage.store('films', this.films);
      this.selectedFilm = null;
  }

  getLastFilms(): Film[] {
    if(!this.films) {
      this.films = this.getFilms();
    }

    return this.films.slice(-4);
  }  
  
  getTopFilms(): Film[] {
    if(!this.films) {
      this.films = this.getFilms();
    }

    return this.films.sort((film1, film2)=>{
      if(film1.stars>film2.stars) {
        return -1;
      }  
      return 0;
    }).slice(0, 3);
  }

}

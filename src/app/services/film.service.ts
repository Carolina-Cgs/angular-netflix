import { Injectable } from '@angular/core';
import { Film } from '../models/film';
import { FILMS } from './mockFilms';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { from, Observable, of } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService {
  films: Film[];
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
    coverUrl: '',
    created_by: 0
  }

  constructor(private http: HttpClient,
              private localStorage: LocalStorageService,
              private userService: UserService) { }


  getFilms(): Observable<Film[]> {
    //this.films = this.localStorage.retrieve('films') || FILMS;
    //return this.films;
    const result = this.http.get<Film[]>('http://netflix.cristiancarrino.com/film/read.php');
    result.subscribe(films => {
      this.films = films;
    });
    return result;
  }

  addFilm() {
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
    this.newFilm.created_by = this.userService.loggedUser.id;
     this.http.post<Film[]>(
       'http://netflix.cristiancarrino.com/film/create.php',
       this.newFilm,
       httpOptions).subscribe(response => {
         this.getFilms().subscribe(response =>
          this.films = response);
     })

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
      coverUrl: '',
      created_by: 0,
    }
   }
   
  editFilm(): void {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.userService.loggedUser.token
      })
    };

    this.http.post<Film>('http://netflix.cristiancarrino.com/film/update.php', this.selectedFilm, httpOptions).subscribe(response => {
      this.getFilms().subscribe(films => {
        // Cerco tra i film quello che stavo editando e poi lo sostituisco con il film che passo come parametro
        let filmToEdit = films.find(x => x.id == this.selectedFilm.id);
        this.selectedFilm = filmToEdit;
      })
    })
  }

  getLastFilms(films: Film[]): Film[] {
    //if(!this.films) {
    //  this.films = this.getFilms();
    //}
  
    return this.films.slice(-4);
  }
  
  
  getTopFilms(films: Film[]): Film[] {
   // if(!this.films) {
    //  this.films = this.getFilms();}

    return this.films.sort((film1, film2) => {
      if(film1.stars>film2.stars) {
        return -1;
      }  
      return 0;
    }).slice(0, 4);
  }

}

import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { Actor } from '../models/actor';
import { Genre } from '../models/genre';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  films: Film[];
  

  constructor(private filmService: FilmService) { }

  ngOnInit(): void {
    this.films = this.filmService.getFilms();
  }

  getCastList(cast: Actor[]) {
    return cast.map(x => x.firstname + ' ' + x.lastname).join(', ');
  }

  getGenreList(genres: Genre[]) {
    return genres.map(x => x.name).join(', ');

  }
  selectThisFilm(film: Film) {
    this.filmService.selectedFilm = film;
  }


}

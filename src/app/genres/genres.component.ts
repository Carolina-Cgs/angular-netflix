import { Component, OnInit } from '@angular/core';
import { Genre } from '../models/genre';
import { GenreService } from '../services/genre.service';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.css']
})
export class GenresComponent implements OnInit {
  genres: Genre[];
  timeout;

  constructor(private genreService: GenreService, private filmService: FilmService) { }


  ngOnInit(): void {
    this.genreService.getGenres().subscribe(response => {
      this.genres = response
    });

    this.filmService.getFilms().subscribe(films => {
      this.genres.map(genre => {
        genre.films = films.filter(film => film.cast.find(x => x.id == genre.id) != null);
        return genre;
      });  
    })
  }

  search(event) {
    let test = event.target.value;
    if(this.timeout) {
      clearTimeout(this.timeout);
    }

    let scope=this;
    this.timeout = setTimeout(function() {
      if(test.length > 2) {
        scope.genreService.getGenres().subscribe((genres) => scope.genres = genres.filter(
          x =>x.name.toLowerCase().indexOf(test.toLowerCase()) > -1));
      } else {
        scope.genreService.getGenres().subscribe((genres) => scope.genres = genres);
      }
    }, 300);
  }
}

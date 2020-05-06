import { Component, OnInit } from '@angular/core';
import { FilmService } from '../services/film.service';
import { ActorService } from '../services/actor.service';
import { GenreService } from '../services/genre.service';
import { Actor } from '../models/actor';
import { Genre } from '../models/genre';

@Component({
  selector: 'app-add-film',
  templateUrl: './add-film.component.html',
  styleUrls: ['./add-film.component.css']
})
export class AddFilmComponent implements OnInit {
  actors: Actor[];
  genres: Genre[];

  constructor(
    public filmService: FilmService,
    private actorService: ActorService,
    private genreService: GenreService
    ) { }

  ngOnInit(): void {
    this.actors = this.actorService.getActors();
    this.genres = this.genreService.getGenres();
  }

}

import { Component, OnInit } from '@angular/core';
import { Actor } from '../models/actor';
import { ActorService } from '../services/actor.service';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit { 
  actors: Actor[];

  constructor(private actorService: ActorService, private filmService: FilmService) { }

  ngOnInit(): void {
    this.actorService.getActors().subscribe(response => {
      this.actors = response
    });

    this.filmService.getFilms().subscribe(films => {
      this.actors.map(actor => {
        actor.films = films.filter(film => film.cast.find(x => x.id == actor.id) != null);
        return actor;
      });  
    })
  }
}

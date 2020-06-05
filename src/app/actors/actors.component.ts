import { Component, OnInit } from '@angular/core';
import { Actor } from '../models/actor';
import { ActorService } from '../services/actor.service';
import { FilmService } from '../services/film.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actors',
  templateUrl: './actors.component.html',
  styleUrls: ['./actors.component.css']
})
export class ActorsComponent implements OnInit { 
  actors: Actor[];
  timeout;

  constructor(private actorService: ActorService,
    private filmService: FilmService,
    private router: Router) { }

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

  search(event) {
    let test = event.target.value;
    if(this.timeout) {
      clearTimeout(this.timeout);
    }

    let scope=this;
    this.timeout = setTimeout(function() {
      if(test.length > 2) {
        scope.actorService.getActors().subscribe((actors) => scope.actors = actors.filter(
          x => {
            const nameAndSurname = x.firstname.toLowerCase() + x.lastname.toLowerCase();
            return nameAndSurname.indexOf(test.toLowerCase()) > -1
          }
        ));
      } else {
        scope.actorService.getActors().subscribe((actors) => scope.actors = actors);
      }
    }, 300);
  }
}

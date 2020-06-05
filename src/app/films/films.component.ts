import { Component, OnInit } from '@angular/core';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';
import { Actor } from '../models/actor';
import { Genre } from '../models/genre';
import { Router } from '@angular/router';
import { faEdit, faTrashAlt, faPlusCircle} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit {
  faEdit = faEdit;
  faTrashAlt = faTrashAlt;
  faPlusCircle = faPlusCircle; 

  films: Film[];
  timeout;

  constructor(private router: Router, private filmService: FilmService) { }

  ngOnInit(): void {
    this.filmService.getFilms().subscribe(response => {
      this.films = response
    });
   // this.films = this.filmService.getFilms();
  }

  getCastList(cast: Actor[]) {
    return cast.map(x => x.firstname + ' ' + x.lastname).join(', ');
  }

  getGenreList(genres: Genre[]) {
    return genres.map(x => x.name).join(', ');

  }
  selectThisFilm(film: Film) {
    this.filmService.selectedFilm = film;
    this.router.navigate(['/films/edit']);
  }

  search(event) {
    let test = event.target.value;
    if(this.timeout) {
      clearTimeout(this.timeout);
    }

    let scope=this;
    this.timeout = setTimeout(function() {
      if(test.length > 2) {
        scope.filmService.getFilms().subscribe((films) => scope.films = films.filter(
          x =>x.title.toLowerCase().indexOf(test.toLowerCase()) > -1));
      } else {
        scope.filmService.getFilms().subscribe((films) => scope.films = films);
      }
    }, 300);
  }

  setVote(film: Film, vote: number) {
    film.stars=vote;
  }

 remove (film: Film): void {
    //this.filmService.removeFilm(film).subscribe(() => setTimeout(() =>this.ngOnInit(), 2000));
    this.filmService.removeFilm(film).subscribe(() => this.ngOnInit());
  }
}

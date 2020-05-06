import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Film } from '../models/film';
import { FilmService } from '../services/film.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  lastFilms: Film[];
  topFilms: Film[];

  constructor(
    public userService: UserService,
    private filmService: FilmService
    ) { }

  ngOnInit(): void {
    this.filmService.getFilms();
    this.userService.getLoggedUser();
    this.lastFilms = this.filmService.getLastFilms();
    this.topFilms = this.filmService.getTopFilms();

  }

}
 
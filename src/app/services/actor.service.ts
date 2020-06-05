import { Injectable } from '@angular/core';
import { Actor } from '../models/actor';
import { ACTORS } from './mockActors';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { of, Observable} from 'rxjs';
import { HttpClient,  HttpHeaders } from '@angular/common/http';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class ActorService { 
  actors: Actor[];
  selectedActor: Actor;
  newActor: Actor = {
    firstname: '',
    lastname: '',
    created_by: 0
  }

  constructor(private http: HttpClient,
    private localStorage:LocalStorageService,
    private userService: UserService) { }

  getActors(): Observable<Actor[]> {
    if (this.actors) {
      return of(this.actors);
    } else {
      const result = this.http.get<Actor[]>('http://netflix.cristiancarrino.com/actor/read.php');
      result.subscribe(
        response => this.actors = response
      )
      return result;
    }
  }

  addActor() {
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
    this.newActor.created_by = this.userService.loggedUser.id;
     this.http.post<Actor[]>(
       'http://netflix.cristiancarrino.com/actor/create.php',
       this.newActor,
       httpOptions).subscribe(response => {
         this.getActors().subscribe(response =>
          this.actors = response);
     })
    this.newActor = {
      firstname: '',
      lastname: '',
      created_by: 0
    }
  }
    
  editActor(): void {
    this.localStorage.store('actors', this.actors);
    this.selectedActor = null;
  }


}

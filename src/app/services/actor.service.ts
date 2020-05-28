import { Injectable } from '@angular/core';
import { Actor } from '../models/actor';
import { ACTORS } from './mockActors';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { of, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ActorService {
  actors: Actor[];
  selectedActor: Actor;
  newActor: Actor = {
    firstname: '',
    lastname: '',
  }

  constructor(private http: HttpClient, private localStorage:LocalStorageService) { }

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

  addActor(actor: Actor) {
    this.actors.push(this.newActor);
    this.localStorage.store('actors', this.actors);
    this.newActor = {
      firstname: '',
      lastname: '',
    }
  }
    
  editActor(): void {
    this.localStorage.store('actors', this.actors);
    this.selectedActor = null;
  }


}

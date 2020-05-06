import { Injectable } from '@angular/core';
import { Actor } from '../models/actor';
import { ACTORS } from './mockActors';
import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';



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

  constructor(private localStorage:LocalStorageService) { }

  getActors(): Actor[] {
    this.actors = this.localStorage.retrieve('actors') || ACTORS;
    return this.actors;
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

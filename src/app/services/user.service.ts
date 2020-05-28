import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  loggedUser: User;

  constructor(private http: HttpClient,
    private localStorage:LocalStorageService) { }

  login(username: string, password: string): boolean {

    this.http.post<User>('http://netflix.cristiancarrino.com/user/login.php', {
      "username": username,
      "password": password
    }).subscribe(response => {
      console.log(response);
      this.loggedUser = response
      this.localStorage.store('loggedUser', this.loggedUser);
    })
    
    return this.loggedUser != null;
  }

  logout(): void {
    this.loggedUser = null;
    this.localStorage.clear('loggedUser');
  }

  getLoggedUser(): void {
    this.loggedUser = this.localStorage.retrieve('loggedUser');
  }

  

}

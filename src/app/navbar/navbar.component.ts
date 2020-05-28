import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  username: string;
  password: string;
  elVisible: boolean = false;
  loginForm: boolean =false;

  constructor(public userService: UserService) { }

  ngOnInit(): void {
    this.userService.getLoggedUser();
  }

  login() {
    if (!this.username || !this.password) {
      alert('Errore: nome utente o password mancanti');
      return;
    }
    this.userService.login(this.username, this.password);
  }

  logout() {
    this.userService.logout();
  }

  showMenu() {
    this.elVisible = !this.elVisible;
  }

  showLoginForm() {
    this.loginForm = !this.loginForm;
  }
}

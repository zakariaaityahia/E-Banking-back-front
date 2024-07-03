import { Component } from '@angular/core';
import {AuthService} from "../../../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {

  constructor(public authService: AuthService, private router: Router) {
  }
  ngOnInit(): void {

  }
  handleLogout() {
    this.authService.logout();
  }
}

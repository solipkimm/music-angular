/*********************************************************************************
*  WEB422 – Assignment 06
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part of this
*  assignment has been copied manually or electronically from any other source (including web sites) or 
*  distributed to other students.
* 
*  Name: Solip Kim   Student ID: 120618194   Date: April 9, 2021
*
*  Online Link: _______________________________________________________________
*
********************************************************************************/ 


import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';

import { AuthService } from './auth.service';
import { User } from './User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'web422-a5';
  searchString: string;
  token: User;

  constructor(
    private router: Router, 
    private auth: AuthService
  ) {}

  handleSearch() {
    this.router.navigate(['/search'], {
      queryParams: { q: this.searchString },
    });
    this.searchString = '';
  }

  ngOnInit(): void {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.token = this.auth.readToken();
      }
    });
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
  }

}

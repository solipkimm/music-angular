import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user = {
    userName: "",
    password: "",
    _id: null
  };
  public warning: string;
  public loading = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {

    if (this.user.userName.length > 0 && this.user.password.length > 0) {
      this.loading = true;
    }

    this.auth.login(this.user).subscribe((success) =>{
      this.loading = false;
      localStorage.setItem('access_token', success.token);
      this.router.navigate[('/newReleases')]
    },
    (err) =>{
      this.warning = err.error.message;
      this.loading = false;
    })
  }
}

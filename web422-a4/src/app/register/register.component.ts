import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public registerUser = {
    userName: "", 
    password: "", 
    password2: ""
  }
  public warning: string;
  public success = false;
  public loading = false;
  //private regSub: any;

  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.auth.register(this.registerUser).subscribe((success) =>{
      this.success = true;
      this.warning = null;
      this.loading = false;
    },
    (err) =>{
      this.warning = err.error.message;
      this.success = false;
      this.loading = false;
    });
  }

  // ngOnDestroy(): void {
  //   this.regSub?.unsubscribe();
  // }

}

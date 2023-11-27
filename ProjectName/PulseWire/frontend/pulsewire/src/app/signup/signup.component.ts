import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  isValidPassword: boolean = true;
  isValidCreds: boolean = true;
  errorMsg: string = '';

  constructor(private userService: UserService, private router: Router) { }

  onRegister(user: {username: string, display: string, password: string, repeatedPassword: string}) {
    let username = user.username;
    
    if (user.password !== user.repeatedPassword) {
      this.isValidCreds = true;
      this.isValidPassword = false;
      this.errorMsg = "Password and repeat password do not match.";
      return;
    }
    this.isValidPassword = true;

    this.userService.register(user).subscribe((res) => {
      if (res != null) {
        this.router.navigate(['/']);
      }
    }, (error) => {
      if (error.status == 400) {
        this.errorMsg = 'The username: ' + username + ' already has an account.';
        this.isValidCreds = false;
      }
    });
  }
}

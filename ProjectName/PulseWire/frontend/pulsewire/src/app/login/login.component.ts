import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  responseData: any;
  isValidEmail: boolean = true;
  isValidCreds: boolean = true;
  errorMsg: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onLogin(user: { username: string, password: string}) {

      this.userService.login(user).subscribe((res) => {
        this.setToken(res, 'user');
        this.router.navigate(['/']);
      }, (error) => { 
        if(error.status == 401) {
          this.errorMsg = 'Your email or password is incorrect! Please try again.'
          this.isValidCreds = false;
        }
      })
  }

  setToken(res: any, user: string) {
    if (res != null) {
      console.log(res);
      this.responseData = res;
      sessionStorage.setItem('password', this.responseData.password);
      sessionStorage.setItem('username', this.responseData.username);
      sessionStorage.setItem('displayName', this.responseData.displayName);
      sessionStorage.setItem('bio', this.responseData.bio);
    }
  }
}

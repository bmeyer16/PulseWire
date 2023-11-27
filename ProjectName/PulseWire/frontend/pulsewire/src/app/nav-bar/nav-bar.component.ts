import { Component } from '@angular/core';
import { UserService } from '../services/user/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  user: any;

  constructor(private userService: UserService, private router: Router){}

  isLoggedIn(){
    if(this.userService.isLoggedIn()){
        this.user = sessionStorage.getItem("username");
        return true;
    } else {
      return false;
    }
  } 

  logout() {
    // Clear user-related information
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('password'); 
    sessionStorage.removeItem('displayName');
    sessionStorage.removeItem('bio');
  
   if (this.userService.logout) {
      this.userService.logout(); 
    }
    this.router.navigate(['/login']);
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { SignupComponent } from './signup/signup.component';
import { PostComponent } from './post/post.component';
import { ProfileOtherComponent } from './profile-other/profile-other.component';

const routes: Routes = [
  { path : '', component : HomeComponent},
  { path : 'home', component : HomeComponent},
  { path : 'signup', component : SignupComponent},
  { path : 'login', component : LoginComponent},
  { path : 'about', component : AboutComponent},
  { path : 'myprofile', component : ProfileComponent},
  { path : 'profile/:username', component : ProfileOtherComponent},
  { path : 'post', component : PostComponent},
  { path: '**', component: (NotFoundComponent)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

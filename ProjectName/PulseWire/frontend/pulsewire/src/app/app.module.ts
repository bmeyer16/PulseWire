import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AboutComponent } from './about/about.component';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { NotFoundComponent } from './notfound/notfound.component';
import { ProfileComponent } from './profile/profile.component';
import { UserService } from './services/user/user.service';

import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { PostComponent } from './post/post.component';
import { ProfileOtherComponent } from './profile-other/profile-other.component';
import { ReplyComponent } from './reply/reply.component';
import { LikeService } from './service like/like.service';
import { SignupComponent } from './signup/signup.component';
import { FollowerService } from './service follower/follower.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    AboutComponent,
    NotFoundComponent,
    ProfileComponent,
    SignupComponent,
    LoginComponent,
    PostComponent,
    ProfileOtherComponent,
    ReplyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [UserService, LikeService, FollowerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

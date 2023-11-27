import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class UserService {
  getCurrentUser() {
    throw new Error('Method not implemented.');
  }
  private url = environment.baseUrl + '/user';

  constructor(private http: HttpClient) { }

  login(user: { username: string, password: string }) {
    let params = new HttpParams().set('username', user.username).set('password', user.password);
    return this.http.post(`${this.url}/login`, null, { params: params });
  }
  isLoggedIn() {
    return sessionStorage.getItem('username') != null;
  }
  logout() {
    // Add any additional cleanup or logout logic here
  }
  register(user: { username: string, display: string, password: string }) {
    let params = new HttpParams().set('username', user.username).set('display', user.display).set('password', user.password);
    return this.http.post(`${this.url}/register`, null, { params: params });
  }

  getUser(username: string) {
    let params = new HttpParams().set('username', username);
    return this.http.post(`${this.url}/getUser`, null, {params : params});
  }

  update(user: {username: string, display: string, password: string, bio: string}) {
    let params = new HttpParams().set('username', user.username).set('display', user.display).set('password', user.password).set('bio', user.bio);
    return this.http.post(`${this.url}/updateUser`, null, { params: params });
  }


}
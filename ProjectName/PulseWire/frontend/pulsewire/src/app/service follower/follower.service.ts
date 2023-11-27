import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';

@Injectable()
export class FollowerService {

    private url = environment.baseUrl + '/follower';

    constructor(private http: HttpClient) { }

    follow(follower: { followerID: string, followedID: string }) {
        let params = new HttpParams().set('followerID', follower.followerID).set('followedID', follower.followedID);
        return this.http.post(`${this.url}/follow`, null, {params: params });
    }

    unfollow(follower: { followerID: string, followedID: string }) {
        let params = new HttpParams().set('followerID', follower.followerID).set('followedID', follower.followedID);
        return this.http.post(`${this.url}/unfollow`, null, {params: params });
    }

    returnFollow(followedID: string) {
        let params = new HttpParams().set('followedID', followedID);
        return this.http.post(`${this.url}/getFollowersForUser`, null, {params: params });
    }

    doesUserFollow(follower: { followerID: any, followedID: string }) {
        let params = new HttpParams().set('followerID', follower.followerID).set('followedID', follower.followedID);
        return this.http.post(`${this.url}/doesUserFollow`, null, {params: params });
    }

}
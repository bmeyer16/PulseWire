import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.development';



@Injectable()
export class LikeService {

    private url = environment.baseUrl + '/like';

    constructor(private http: HttpClient) { }

    addLike(like: { userID: string, postID: any}) {
        let params = new HttpParams().set('userID', like.userID).set('postID', like.postID);
        return this.http.post(`${this.url}/addLike`, null, {params: params });
    }

    removeLike(like: { userID: string, postID: any}) {
        let params = new HttpParams().set('postID', like.postID).set('userID', like.userID);
        return this.http.post(`${this.url}/removeLike`, null, {params: params });
    }

    hasUserLikedPost(like: {userID: string, postID: any}) {
        let params = new HttpParams().set('userID', like.userID).set('postID', like.postID);
        return this.http.post(`${this.url}/hasUserLikedPost`, null, {params: params });
    }

    returnLike(postID: number) {
        let params = new HttpParams().set('postID', postID);
        return this.http.post(`${this.url}/getLikesForPost`, null, {params: params });
    }
  }
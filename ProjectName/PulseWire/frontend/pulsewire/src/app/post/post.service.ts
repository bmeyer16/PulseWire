import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Post } from './post.model';
import { environment } from 'src/environments/environment.development';
import { Reply } from '../reply/reply.model';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  
private apiUrl = environment.baseUrl + '/post';

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/`);
  }

  getPostById(id: number): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Post>(url);
  }

  getPostsForCurrentUser(username: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${this.apiUrl}/api/posts?username=${username}`);
  }

  createPost(post: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/`, post);
    
  }

  updatePost(id: number, updatedPost: { content: string }): Observable<Post> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Post>(url, updatedPost);
  }

  deletePost(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete<void>(url);
  }

  createReply(postId: number, reply: Reply): Observable<Reply> {
    const url = `${this.apiUrl}/${postId}/reply`;
    return this.http.post<Reply>(url, reply);
  }

  getRepliesForPost(postId: number){
    const url = `${this.apiUrl}/${postId}/replies`;
    return this.http.get<Reply>(url);
  }

}
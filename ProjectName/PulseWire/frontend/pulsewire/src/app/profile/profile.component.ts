import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post/post.service';
import { FollowerService } from '../service follower/follower.service';
import { Reply } from '../reply/reply.model';
import { LikeService } from '../service like/like.service';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  userID: any;
  responseData: any;
  username: any;
  password: any;
  bio: any;
  user: any;
  display: any;
  posts: any[] = [];
  replyMap = new Map<number, Array<Reply>>();
  likesMap: Map<number, number> = new Map();
  hasLikedMap: Map<number, boolean> = new Map();
  follows: number = 0;
  errorMsg: string = "";
  replyErrorMsg: string = "";

  constructor(private userService: UserService, 
    private postService: PostService, private likeService: LikeService, private followerService: FollowerService, private router: Router){}

  ngOnInit(){
    if(!this.userService.isLoggedIn()){
      this.router.navigate(['/login']);
    }
    if(sessionStorage.getItem("username")!=null){ 
      this.password = sessionStorage.getItem("password");
      this.username = sessionStorage.getItem("username");
      this.display = sessionStorage.getItem("displayName");
      this.bio = sessionStorage.getItem("bio");
    }
    this.loadPosts();
    this.returnFollow(this.username);
  }

  loadPosts() {
    const username = sessionStorage.getItem("username");
    if (username) {
      console.log(`Fetching posts for user: ${username}`);
      this.postService.getPostsForCurrentUser(username).subscribe(posts => {
        this.posts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
        this.posts = posts;
        this.posts.forEach(post => this.getRepliesForPost(post.id));
        this.posts.forEach(post => this.returnLike(post.id));
        if(this.userService.isLoggedIn()){
          this.posts.forEach(post => this.hasUserLikedPost(post.id));
        }
        console.log('Posts loaded:', posts);
      });
    } else {
      console.error('Username is missing.');
    }
  }
  
  
  updateInfo(user: {username: string, display: string, password: string, bio: string}){
    console.log(user.display);
    this.userService.update(user).subscribe((res) => {
        this.setToken(res, 'user');
        alert("Updated!");
    }, (error) => {
      if (error.status == 400) {
        console.log("Update failed");
      }
    });
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

  startEditing(post: any) {
    post.isEditing = true;
    post.updatedContent = post.content;
  }

  saveEdit(post: any) {
    if(post.updatedContent==""){
      this.errorMsg = "Cannot leave post content empty.";
      return;
    }
    this.postService.updatePost(post.id, { content: post.updatedContent }).subscribe(
      updatedPost => {
        post.content = updatedPost.content;
        post.isEditing = false;
      },
      error => {
        console.error('Error updating post:', error);
      }
    );
  }

  cancelEdit(post: any) {
    post.isEditing = false;
  }

  deletePost(id: number) {
    this.postService.deletePost(id).subscribe(
      () => {
        this.posts = this.posts.filter(post => post.id !== id);
        console.log(`Item with ID ${id} deleted successfully.`);
      },
      error => {
        console.error(`Error deleting item with ID ${id}:`, error);
      }
    );
  }


  toggleReply(post: any) {
    post.isReplying = !post.isReplying;
  }
  
  createReply(replyContent: string, post: any) {
    if(replyContent == ""){
      this.replyErrorMsg = "Content cannot be null.";
      return;
    }
    if (post && this.username) {
      const newReply: Reply = {
        id: 0,
        username: this.username,
        content: replyContent,
        timestamp: new Date(),
        displayName: '',
        text: '',
        newReplyContent: ''
      };
      this.postService.createReply(post.id, newReply).subscribe(reply => {
        this.replyErrorMsg = "";
        this.replyMap.get(post.id)?.push(reply);
        post.isReplying = false;
      });
    } else {
      console.error('Selected post or user information is missing.');
    }
  }

  getRepliesForPost(postId: number) {
    this.postService.getRepliesForPost(postId).subscribe((res: any)=>{
      this.replyMap.set(postId, res);
    })
  }

  lengthGreaterThanZero(array: Array<Reply> | undefined ){
    if(array!=undefined && array.length!=0){
      return true;
    } else {
      return false;
    }
  }
    
  isLoggedIn() {
    if (this.userService.isLoggedIn()) {
      this.user = { username: sessionStorage.getItem("username") || '' };
      return true;
    } else {
      return false;
    }
  } 

  addLike(postID: number) {
    this.userID = sessionStorage.getItem("username");
    let like = {
      userID: this.userID,
      postID: postID,
    }
    
    this.likeService.addLike(like).subscribe(
      () => {
        alert("Like added!");
        console.log(`Like added successfully`);
        let currentVal = this.likesMap.get(postID);
        this.hasLikedMap.set(postID, true);
        if(currentVal!=undefined){
          this.likesMap.set(postID, currentVal + 1);
        }
      },
      error => {
        console.error(`Error adding like`);
      }
    );
  }

  removeLike(postID: number) {
    this.userID = sessionStorage.getItem("username");
    let like = {
      userID: this.userID,
      postID: postID,
    }
    this.likeService.removeLike(like).subscribe(
      () => {
      alert("Like removed!");
      console.log(`Like removed successfully`);
      let currentVal = this.likesMap.get(postID);
      this.hasLikedMap.set(postID, false);
      if(currentVal!=undefined){
        this.likesMap.set(postID, currentVal - 1);
      }  
    },
    error => {
      console.error('Error deleting like');
    }
    );
  }

  returnFollow(followedID: string) {
    this.followerService.returnFollow(followedID).subscribe(
      (total: any) => {
        console.log('Followers ${followedID}:', total);
        this.follows = total;
      },
      (error: any) => console.error('Error:', error)
    );
  }

  returnLike(postID: number) {
    if (!this.likesMap.has(postID)) {
      this.likeService.returnLike(postID).subscribe(
        (total: any) => {
          this.likesMap.set(postID, total);
          console.log(`Likes for post ${postID}:`, total);
        },
        (error: any) => console.error('Error:', error)
      );
    }
  }

  hasUserLikedPost(postID: number){
    if (!this.hasLikedMap.has(postID)) {
      this.userID = sessionStorage.getItem("username");
      let like = {
        userID: this.userID,
        postID: postID,
      }
      this.likeService.hasUserLikedPost(like).subscribe(
        (liked: any) => {
          this.hasLikedMap.set(postID, liked);
        }
      );
    }
  }

  
}

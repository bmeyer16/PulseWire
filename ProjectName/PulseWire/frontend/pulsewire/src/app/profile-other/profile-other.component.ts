import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from '../post/post.service';
import { FollowerService } from '../service follower/follower.service';
import { Reply } from '../reply/reply.model';
import { LikeService } from '../service like/like.service';
import { UserService } from '../services/user/user.service';


@Component({
  selector: 'app-profile-other',
  templateUrl: './profile-other.component.html',
  styleUrls: ['./profile-other.component.css']
})
export class ProfileOtherComponent {

  responseData: any;
  user: any;
  username: any;
  bio: any;
  displayName: any;
  posts: any[] = [];
  replyMap = new Map<number, Array<Reply>>();
  loggedInUser: any;
  likesMap: Map<number, number> = new Map();
  hasLikedMap: Map<number, boolean> = new Map();
  userID: any;
  follows: number = 0;
  following: any;
  replyErrorMsg: string = "";

  constructor(private userService: UserService, private likeService: LikeService,
    private postService: PostService, private followerService: FollowerService, private activatedRouter: ActivatedRoute, private router: Router){}

  ngOnInit(){
    this.activatedRouter.paramMap.subscribe((param) => {
      this.username = param.get('username');
      if(sessionStorage.getItem("username") == this.username){
        this.router.navigate(['/myprofile']);
      } else {
      this.userService.getUser(this.username).subscribe((res) => {
          this.user = res;
          this.bio = this.user.bio;
          this.displayName = this.user.displayName;
          this.loggedInUser = sessionStorage.getItem("username");
          this.doesUserFollow();
      });
    }
  });
    this.returnFollow(this.username);
    this.loadPosts();
  }

  loadPosts() {
    const username = this.username;
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
        username: this.loggedInUser,
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
  follow(followedID: string) {
    let follow = {
      followerID: this.user.username,
      followedID: followedID,
    }

    this.followerService.follow(follow).subscribe(
      () => {
        alert("You Followed!");
        console.log('You Followed!');
        this.follows += 1;
        this.following = true;
      }, 
      error => {
        console.error('Error Following');
      }
    )
  }

  unfollow(followedID: string) {
    let follow = {
      followerID: this.user.username,
      followedID: followedID,
    }
    this.followerService.unfollow(follow).subscribe(
      () => {
        alert("You Unfollowed!");
        console.log("You Unfollowed!");
        this.follows -= 1;
        this.following = false;
      },
      error => {
        console.error('Error Unfollowing');
      }
    )
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

  returnFollow(followedID: string) {
    this.followerService.returnFollow(followedID).subscribe(
      (total: any) => {
        console.log(`Followers ${followedID}:`, total);
        this.follows = total;
      },
      (error: any) => console.error('Error:', error)
    );
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

  doesUserFollow(){  
    let follow = {
      followerID: this.loggedInUser,
      followedID: this.username
    }
    console.log(follow.followerID);
    console.log(follow.followedID);
    this.followerService.doesUserFollow(follow).subscribe(
      (res) => {
        console.log(res);
        this.following = res;
     }
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PostService } from '../post/post.service';
import { LikeService } from '../service like/like.service';
import { UserService } from '../services/user/user.service';
import { Reply } from '../reply/reply.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  posts: any[] = [];
  user: { username: string } | undefined;
  showNewPostForm: boolean = false;
  username: string = '';
  display: string = '';
  replyMap = new Map<number, Array<Reply>>();
  userID: any;
  likesMap: Map<number, number> = new Map();
  hasLikedMap: Map<number, boolean> = new Map();
  errorMsg: string = "";
  replyErrorMsg : string = "";

  constructor(private postService: PostService, 
              private userService: UserService, 
              private likeService: LikeService, 
              private router: Router) { }
  
  ngOnInit() {
    if (this.userService.isLoggedIn()) {
      this.user = { username: sessionStorage.getItem("username") || '' };
    }
    this.postService.getPosts().subscribe(
      posts => {
        this.posts = posts.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        this.posts.forEach(post => this.getRepliesForPost(post.id));
        this.posts.forEach(post => this.returnLike(post.id));
        if(this.userService.isLoggedIn()){
          this.posts.forEach(post => this.hasUserLikedPost(post.id));
        }
      },
      error => {
        console.error('Error fetching posts:', error);
      }
    );
    
  }

  isLoggedIn() {
    if (this.userService.isLoggedIn()) {
      this.user = { username: sessionStorage.getItem("username") || '' };
      return true;
    } else {
      return false;
    }
  }

  selectPost(post: any) {
    post.isReplying = !post.isReplying;
  }

  goToPostForm() {
    this.router.navigate(['/post'], { state: { isAddPost: true } });
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
        error => console.error('Error:', error)
      );
    }
  }

  getLikeNum(res: any){
    if(res!=null){
      res.subscribe()
      return res.total;
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

  postBelongsToUser(post: any) {
    if (this.user != undefined && post.username == this.user.username) {
      return true;
    } else {
      return false;
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
    if (post && this.user && this.user.username) {
      const newReply: Reply = {
        id: 0,
        username: this.user.username,
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

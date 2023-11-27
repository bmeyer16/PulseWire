import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() post: any;
  @Output() deleteClick = new EventEmitter<number>();
  @Output() editClick = new EventEmitter<any>();
  isAddPost: boolean = false;
  posts: Post[] = [];
  errorMsg: string = "";
  editErrorMsg: string = "";

  newPost: Post = {
    id: 0,
    content: '',
    username: '',
    displayName: '',
    createdAt: new Date(),
    password: ''
  };
  username: string | null | undefined;
  display: string | null | undefined;

  constructor(private postService: PostService, 
    private route: ActivatedRoute,
    private router: Router) {}

  ngOnInit() {
    this.isAddPost = history.state.isAddPost;
    if (sessionStorage.getItem("username") != null) {
      this.username = sessionStorage.getItem("username");
      this.display = sessionStorage.getItem("displayName");
    } else {
      this.router.navigate(['/login']);
    }
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe(posts => {
      console.log('Fetched posts:', posts);
      this.posts = posts;
    });
  }

  createPost() {
    console.log('createPost called');
    console.log('newPost:', this.newPost);
    if (this.username && this.display) {
      this.newPost.username = this.username;
      this.newPost.displayName = this.display;
    } else {
      console.error('Username or display name is missing.');
      this.errorMsg = 'Username or display name is missing.';
      return;
    }
    if(this.newPost.content==''){
      this.errorMsg = "Cannot leave content blank."
      return;
    }
    this.postService.createPost(this.newPost).subscribe(post => {
      console.log('Post created:', post);
      this.posts.push(post);
      this.newPost.content = '';
      this.newPost.username = '';
      this.newPost.displayName = '';
      alert("Posted!");
      this.router.navigate(['/home']);
    });
  }

  saveEdit(post: any) {
    this.postService.updatePost(post.id, post.updatedContent).subscribe(
      updatedPost => {
        if(post.updatedContent==""){
          this.editErrorMsg = "Cannot leave post content empty.";
          return;
        }
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
    this.deleteClick.emit(id);
  }

  startEditing(post: any) {
    this.editClick.emit(post); 
  }
  
}

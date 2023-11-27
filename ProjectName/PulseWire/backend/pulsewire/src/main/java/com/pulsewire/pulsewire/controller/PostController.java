package com.pulsewire.pulsewire.controller;

import com.pulsewire.pulsewire.model.Post;
import com.pulsewire.pulsewire.model.Reply;
import com.pulsewire.pulsewire.repo.PostRepo;
import com.pulsewire.pulsewire.repo.ReplyRepo;
import com.pulsewire.pulsewire.service.PostService;
import com.pulsewire.pulsewire.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/pulsewire/post")
public class PostController {
    @Autowired
    private PostRepo postRepository;

    @Autowired
    private ReplyRepo replyRepository;

    @Autowired
    PostService postService;

    @GetMapping("/")
    public List<Post> getAllPosts() {
        return postRepository.findAll();
    }

    @GetMapping("/api/posts")
    public List<Post> getPostsByUsername(@RequestParam String username) {
    return postRepository.findByUsername(username);
}

    @PostMapping("/")
    public Post createPost(@RequestBody Post post) {
        return postRepository.save(post);
    }
    @GetMapping("/posts/currentUser")
    public List<Post> getPostsForCurrentUser(@RequestParam String username) {
     return postRepository.findByUsername(username);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Post> updatePost(@PathVariable Long id, @RequestBody Post updatedPost) {
    Optional<Post> postOptional = postRepository.findById(id);

    if (postOptional.isPresent()) {
        Post post = postOptional.get();
        post.setContent(updatedPost.getContent());
        postRepository.save(post);
        return ResponseEntity.ok(post);
    } else {
        return ResponseEntity.notFound().build();
    }
}

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deletePost(@PathVariable Long id) {
        Optional<Post> postOptional = postRepository.findById(id);

        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            for(Reply reply : replyRepository.findByPost(post)){
                replyRepository.delete(reply);
            }
            postRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{postId}/reply")
    public ResponseEntity<Reply> addReplyToPost(@PathVariable Long postId, @RequestBody Reply reply) {
        Optional<Post> postOptional = postRepository.findById(postId);

        System.out.println("Is post present: " + postOptional.isPresent());
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            
            reply.setCreatedAt(new Date());
            reply.setPost(post);
            replyRepository.save(reply);

            return ResponseEntity.ok(reply);
        } else {
            return ResponseEntity.notFound().build();
        }
    }


    @GetMapping("/{postId}/replies")
    public ResponseEntity<List<Reply>> getRepliesForPost(@PathVariable Long postId) {
        List<Reply> replies;
        Optional<Post> postOptional = postRepository.findById(postId);
        if(postOptional.isPresent()){
            Post post = postOptional.get();
            replies = replyRepository.findByPost(post);
        } else {
            replies = null;
        }

        return postOptional.map(post -> ResponseEntity.ok(replies))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}

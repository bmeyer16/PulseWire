package com.pulsewire.pulsewire.service;

import com.pulsewire.pulsewire.model.Post;
import com.pulsewire.pulsewire.model.Reply;
import com.pulsewire.pulsewire.repo.PostRepo;
import com.pulsewire.pulsewire.repo.ReplyRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class PostService {

    @Autowired
    private static PostRepo postRepo;

    @Autowired
    private static ReplyRepo replyRepo;

    public List<Post> getAllPosts() {
        return postRepo.findAll();
    }

    public static Post getPostById(Long id) {
        return postRepo.findById(id).orElse(null);
    }

    public List<Post> getPostsForCurrentUser(String username) {
        return postRepo.findByUsername(username);
    }

    public Post createPost(Post post) {
        return postRepo.save(post);
    }

    public void deletePost(Long id) {
        postRepo.deleteById(id);
    }


    public ResponseEntity<Post> updatePost(Long id, String content) {
        Optional<Post> postOptional = postRepo.findById(id);
    
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            post.setContent(content);
            postRepo.save(post);
            return ResponseEntity.ok(post);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    
    public ResponseEntity<Reply> addReplyToPost(Long id, Reply reply) {
        Optional<Post> postOptional = postRepo.findById(id);

        System.out.println("Is post present: " + postOptional.isPresent());
        if (postOptional.isPresent()) {
            Post post = postOptional.get();
            
            reply.setCreatedAt(new Date());
            reply.setPost(post);
            replyRepo.save(reply);

            return ResponseEntity.ok(reply);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    public ResponseEntity<List<Reply>> getRepliesForPost(Long postId) {
        List<Reply> replies;
        Optional<Post> postOptional = postRepo.findById(postId);
        if(postOptional.isPresent()){
            Post post = postOptional.get();
            replies = replyRepo.findByPost(post);
        } else {
            replies = null;
        }

        return postOptional.map(post -> ResponseEntity.ok(replies))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }
}
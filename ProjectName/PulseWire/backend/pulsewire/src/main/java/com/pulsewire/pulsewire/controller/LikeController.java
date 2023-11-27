package com.pulsewire.pulsewire.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pulsewire.pulsewire.service.LikeService;


@RestController
@RequestMapping("/pulsewire/like")
public class LikeController {
    @Autowired
    private LikeService likeService;

    @PostMapping("/addLike")
    public void addLike(@RequestParam String userID, int postID) {
        likeService.addLike(userID, postID);
    }
    
     @PostMapping("/removeLike")
    public void removeLike(@RequestParam int postID, String userID) {
        likeService.removeLike(postID, userID);
    }

    @PostMapping("/getLikesForPost")
    public ResponseEntity<Integer> getLikesForPost(@RequestParam int postID) {
        return likeService.getLikesForPost(postID);
    }

    @PostMapping("/hasUserLikedPost")
    public ResponseEntity<Boolean> hasUserLikedPost(@RequestParam String userID, int postID) {
        return likeService.hasUserLikedPost(postID, userID);
    }
}

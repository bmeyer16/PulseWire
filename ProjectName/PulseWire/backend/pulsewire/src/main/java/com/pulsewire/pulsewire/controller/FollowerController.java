package com.pulsewire.pulsewire.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pulsewire.pulsewire.service.FollowerService;

@RestController
@RequestMapping("/pulsewire/follower")
public class FollowerController {
    @Autowired
    private FollowerService followerService;

    @PostMapping("/follow")
    public void follow(@RequestParam String followerID, String followedID) {
        followerService.follow(followerID, followedID);
    }

    @PostMapping("/unfollow")
    public void unfollow(@RequestParam String followerID, String followedID) {
        followerService.unfollow(followerID, followedID);
    }

    @PostMapping("/getFollowersForUser")
    public ResponseEntity<Integer> getFollowersForUser(@RequestParam String followedID) {
        return followerService.getFollowersForUser(followedID);
    }

    @PostMapping("/doesUserFollow")
    public ResponseEntity<Boolean> doesUserFollow(@RequestParam String followerID, String followedID) {
        return followerService.doesUserFollow(followerID, followedID);
    }

}
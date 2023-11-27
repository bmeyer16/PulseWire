package com.pulsewire.pulsewire.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pulsewire.pulsewire.model.Follower;
import com.pulsewire.pulsewire.repo.FollowerRepo;


@Service
public class FollowerService {
    
    @Autowired
    private FollowerRepo followerRepository;

    public void follow(String followerID, String followedID) {
        Follower follow = new Follower(followerID, followedID);
        followerRepository.save(follow);
    }

    public void unfollow(String followerID, String followedID) {
        List<Follower> totalFollows = followerRepository.findAll();
        
        for (Follower follow : totalFollows) {
            if (follow.getFollowerID().equals(followerID) && follow.getFollowedID().equals(followedID)) {
                followerRepository.delete(follow);
            }
        }
    }

    public ResponseEntity<Integer> getFollowersForUser(String followedID) {
        int total = 0;
        List<Follower> followList = followerRepository.findAll();
        
        for (Follower follow : followList) {
            if (follow.getFollowedID().equals(followedID)) {
                total += 1;
            }
        }
        return new ResponseEntity<>(total, HttpStatus.OK);
    }

    public ResponseEntity<Boolean> doesUserFollow(String followerID, String followedID){
        boolean body = false;
        List<Follower> list = followerRepository.findAll();

        for (Follower follow : list) {
            if (follow.getFollowerID().equals(followerID) && follow.getFollowedID().equals(followedID))  {
                body = true;
            }
        }
        return new ResponseEntity<>(body, HttpStatus.OK);
    }
}

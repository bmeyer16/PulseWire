package com.pulsewire.pulsewire.service;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.pulsewire.pulsewire.model.Like;
import com.pulsewire.pulsewire.repo.LikeRepo;

@Service
public class LikeService {
    
    @Autowired
    private LikeRepo likeRepository;
   
    

    public void addLike(String userID, int postID) {
       Like like = new Like(userID, postID);
       likeRepository.save(like);
    }

    public void removeLike(int postID, String userID) {
        List<Like> totalLikes = likeRepository.findAll();
        System.out.println("Post id: " + postID + " User id: " + userID);

        for (Like like : totalLikes) {
            System.out.println("reached outside");
            System.out.println("Post id: " + like.getpostID() + " User id: " + like.getuserID());
            if (like.getpostID() == postID && like.getuserID().equals(userID)) {
                System.out.println("reached inside");
                likeRepository.delete(like);
            }
        }
    }

    public ResponseEntity<Integer> getLikesForPost(int postID) {
        int total = 0;
        List<Like> likeList = likeRepository.findAll();

        for (Like like : likeList) {
            if (like.getpostID() == postID) {
                total += 1;
            }
        }
        return new ResponseEntity<>(total, HttpStatus.OK);
    }


    public ResponseEntity<Boolean> hasUserLikedPost(int postID, String userID){
        boolean body = false;
        List<Like> list = likeRepository.findAll();

        for (Like like : list) {
            if (like.getpostID() == postID && like.getuserID().equals(userID)) {
                body = true;
            }
        }
        return new ResponseEntity<>(body, HttpStatus.OK);
    }
}

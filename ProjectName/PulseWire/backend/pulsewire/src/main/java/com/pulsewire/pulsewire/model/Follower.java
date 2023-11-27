package com.pulsewire.pulsewire.model;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "Follower")
public class Follower {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long followID;
    private String followerID;
    private String followedID;

    public Follower() {
    }

    public Follower(Long followID, String followerID, String followedID) {
        this.followID = followID;
        this.followerID = followerID;
        this.followedID = followedID;
    }

    public Follower(String followerID, String followedID) {
        this.followerID = followerID;
        this.followedID = followedID; 
    }

    public Long getFollowID() {
        return this.followID;
    }

    public void setFollowID(Long followID) {
        this.followID = followID;
    }

    public String getFollowerID() {
        return this.followerID;
    }

    public void setFollowerID(String followerID) {
        this.followerID = followerID;
    }

    public String getFollowedID() {
        return this.followedID;
    }

    public void setFollowedID(String followedID) {
        this.followedID = followedID;
    }
}

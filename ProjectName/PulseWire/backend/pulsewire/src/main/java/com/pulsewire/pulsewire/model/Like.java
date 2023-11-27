package com.pulsewire.pulsewire.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table(name = "likes")
public class Like {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long autoID;
    private String userID;
    private int postID; 


    public Like(){
        
    }

    public Like(String userID, int postID) {
        this.userID = userID;
        this.postID = postID;
    }


    public Like(Long autoID, String userID, int postID) {
        this.autoID = autoID;
        this.userID = userID;
        this.postID = postID;
    }
    
    public Long getautoID() {
        return autoID;
    }
    public void setautoID(Long autoID) {
        this.autoID = autoID;
    }
    public String getuserID() {
        return this.userID;
    }
    public void setuserID(String userID) {
        this.userID = userID;
    }
    public int getpostID() {
        return this.postID;
    }
    public void setpostID(int postID) {
        this.postID = postID;
    }
   
}


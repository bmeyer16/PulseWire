package com.pulsewire.pulsewire.model;

import java.util.Date;
import java.util.List;

import javax.persistence.*;

@Entity
@Table(name = "Post")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String displayName;
    private String password;
    private String content;
    private Date createdAt;
    
    public Post() {
        this.createdAt = new Date();
    }

    public Post(Long id, String username, String displayName, String content, Date createdAt) {
        this.id = id;
        this.username = username;
        this.displayName = displayName;
        this.content = content;
        this.createdAt = new Date();
    }
    public Post(String username, String displayName, String content,  Date createdAt) {
        this.username = username;
        this.displayName = displayName;
        this.content = content;
        this.createdAt = new Date();
    }
    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }
    public String getUsername() {
        return this.username;
    }
    public void setUsername(String name) {
        this.username = name;
    }
    public String getDisplayName() {
        return this.displayName;
    }
    public void setDisplayName(String displayName) {
        this.displayName = displayName;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    public String getContent() {
        return this.content;
    }
    public void setContent(String content){
        this.content = content;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }
}
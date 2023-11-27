package com.pulsewire.pulsewire.model;

import javax.persistence.*;

@Entity
@Table(name = "User")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String displayName;
    private String password;
    private String bio;
    public User() {
    }
    public User(Long id, String username, String displayName, String password, String bio) {
        this.id = id;
        this.username = username;
        this.displayName = displayName;
        this.password = password;
        this.bio = bio;
    }
    public User(String username, String displayName, String password, String bio) {
        this.username = username;
        this.displayName = displayName;
        this.password = password;
        this.bio = bio;
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
    public String getBio() {
        return this.bio;
    }
    public void setBio(String bio){
        this.bio = bio;
    }

    
}

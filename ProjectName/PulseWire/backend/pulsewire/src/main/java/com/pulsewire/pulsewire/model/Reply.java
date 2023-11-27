package com.pulsewire.pulsewire.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "Reply")
public class Reply {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String username;
    private String content;
    private Date createdAt;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    public Reply() {
        this.createdAt = new Date();
    }

    public Reply(String username, String content, Date createdAt, Post post) {
        this.username = username;
        this.content = content;
        this.createdAt = createdAt;
        this.post = post;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public Post getPost() {
        return post;
    }

    public void setPost(Post post) {
        this.post = post;
    }
}

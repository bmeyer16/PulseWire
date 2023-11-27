package com.pulsewire.pulsewire.repo;
import com.pulsewire.pulsewire.model.Post;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PostRepo extends JpaRepository<Post, Long> {
    List<Post> findAll();
    List<Post> findByUsername(String username);

    void deleteById(Long id);
    
    @Modifying 
    @Query("UPDATE Post p SET p.content = :content WHERE p.id = :id")
    void updatePost(@Param("id") Long id, @Param("content") String content);
}

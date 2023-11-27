package com.pulsewire.pulsewire.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pulsewire.pulsewire.model.Follower;

@Repository
public interface FollowerRepo extends JpaRepository<Follower, Long> {
    
    List<Follower> findByFollowedID(String followedID); 
    
}

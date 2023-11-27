package com.pulsewire.pulsewire.repo;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pulsewire.pulsewire.model.Like;



@Repository
public interface LikeRepo extends JpaRepository<Like, Long> {
    List<Like> findAll(); 
}


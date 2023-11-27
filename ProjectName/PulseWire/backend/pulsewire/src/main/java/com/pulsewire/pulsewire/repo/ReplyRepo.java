package com.pulsewire.pulsewire.repo;
import com.pulsewire.pulsewire.model.Post;
import com.pulsewire.pulsewire.model.Reply;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReplyRepo extends JpaRepository<Reply, Long> {
    List<Reply> findAll();
    List<Reply> findByPost(Post post);
}


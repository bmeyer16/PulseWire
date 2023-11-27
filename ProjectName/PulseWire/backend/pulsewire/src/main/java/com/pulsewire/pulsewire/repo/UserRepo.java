package com.pulsewire.pulsewire.repo;
import com.pulsewire.pulsewire.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepo extends JpaRepository<User, Long> {
    User findUserByUsername(String username);    
}

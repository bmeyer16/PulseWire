package com.pulsewire.pulsewire.service;
import com.pulsewire.pulsewire.model.User;
import com.pulsewire.pulsewire.repo.UserRepo;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public ResponseEntity<User> registerUser(String username, String display, String password) {
        if(findUserByUsername(username) == null) {
            User user = new User(username, display, password, "");
            userRepo.save(user);
            return new ResponseEntity<>(user, HttpStatus.CREATED);
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    public ResponseEntity<User> login(String username, String password) {
        User user = findUserByUsername(username);
        if (user == null || !(user.getPassword().equals(password))) {
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    private User findUserByUsername(String username) {
        User user = userRepo.findUserByUsername(username);
        if(user == null) {
            return null;
        }
        Optional<User> userExists = userRepo.findById(user.getId());
        if(userExists.isPresent()) {
            return userExists.get();
        }
        return null;
    }

    public ResponseEntity<User> getUser(String username) {
        User user = findUserByUsername(username);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    public ResponseEntity<User> updateUser(String username, String display, String password, String bio) {
        if(findUserByUsername(username) != null) {
            User user = findUserByUsername(username);
            user.setUsername(username);
            user.setPassword(password);
            user.setDisplayName(display);
            user.setBio(bio);
            userRepo.save(user);
            return new ResponseEntity<>(user, HttpStatus.OK);
        }
        return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
    }
}

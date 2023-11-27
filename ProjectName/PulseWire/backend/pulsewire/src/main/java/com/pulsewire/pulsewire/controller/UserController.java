package com.pulsewire.pulsewire.controller;
import com.pulsewire.pulsewire.model.User;
import com.pulsewire.pulsewire.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/pulsewire/user")
public class UserController {
    @Autowired
    UserService userService;

    @PostMapping(value = "/getUser")
    public ResponseEntity<User> getUser(@RequestParam String username) {
        return userService.getUser(username);
    }

    @PostMapping(value = "/login")
    public ResponseEntity<User> login(@RequestParam String username, @RequestParam String password) {
        System.out.format("sign up email: %s password: %s \n", username, password);    
        return userService.login(username,password);
    }

    @PostMapping("/register")
    public ResponseEntity<User> registerUser(@RequestParam String username, @RequestParam String display,
                                               @RequestParam String password) {
        return userService.registerUser(username, display, password);
    }

    @PostMapping("/updateUser")
    public ResponseEntity<User> updateUser(@RequestParam String username, @RequestParam String display,
                                               @RequestParam String password, @RequestParam String bio) {
        return userService.updateUser(username, display, password, bio);
    }
}
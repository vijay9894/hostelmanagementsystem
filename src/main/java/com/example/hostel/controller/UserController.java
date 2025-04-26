package com.example.hostel.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hostel.entity.StudentEntity;
import com.example.hostel.entity.UserEntity;
import com.example.hostel.service.StudentService;
import com.example.hostel.service.UserService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/hms/api")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
	
	@Autowired
	private StudentService studentService;
	
	@Autowired
	private UserService userService;
	
	@PostMapping("/register")
	public ResponseEntity<String> register(@RequestBody UserEntity user) {
	    try {
	        Optional<StudentEntity> student = studentService.getByPRN(user.getPRN());

	        if (student.isPresent()) {
	            userService.save(user);
	            return ResponseEntity.ok("User registered successfully");
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND)
	                .body("Error: Student PRN not found in database. Please register as a student first.");
	        }
	    } catch (Exception e) {
	        e.printStackTrace();  // Print error details in logs
	        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
	            .body("Error: Unable to register due to server issue.");
	    }
	}


	 @PostMapping("/login")
	 public String login(@RequestBody UserEntity loginRequest, HttpSession session) {
	     Optional<UserEntity> user = userService.findByPrn(loginRequest.getPRN());

	     if (user.isPresent() && user.get().getPassword().equals(loginRequest.getPassword())) {
	         session.setAttribute("user", user.get().getPRN());
	         return "Login successful";
	     } else {
	         return "Invalid PRN or password";
	     }
	 }


}

package com.example.hostel.controller;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.hostel.entity.AdminEntity;
import com.example.hostel.service.AdminService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/hms/api/admin")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AdminController {

    @Autowired
    private AdminService adminService;

    // Admin Registration
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody AdminEntity admin) {
        try {
            Optional<AdminEntity> existingAdmin = adminService.findByPrn(admin.getAdminId());

            if (existingAdmin.isPresent()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Admin ID already exists!");
            }

            adminService.save(admin);
            return ResponseEntity.ok("Admin registered successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error: Unable to register due to server issue.");
        }
    }

    // Admin Login
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody AdminEntity loginRequest, HttpSession session) {
        Optional<AdminEntity> admin = adminService.findByPrn(loginRequest.getAdminId());

        if (admin.isPresent() && admin.get().getPassword().equals(loginRequest.getPassword())) {
            session.setAttribute("admin", admin.get().getAdminId());
            return ResponseEntity.ok("Admin login successful");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid Admin ID or password");
        }
    }
}


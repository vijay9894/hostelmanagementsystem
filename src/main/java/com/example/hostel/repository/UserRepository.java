package com.example.hostel.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hostel.entity.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity, String> {

}

package com.example.hostel.service;

import java.util.Optional;

import com.example.hostel.entity.UserEntity;

public interface UserService {
	Optional<UserEntity> findByPrn(String prn);
	UserEntity save(UserEntity user);
}

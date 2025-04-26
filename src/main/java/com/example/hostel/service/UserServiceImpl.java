package com.example.hostel.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostel.entity.UserEntity;
import com.example.hostel.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;
	@Override
	public Optional<UserEntity> findByPrn(String PRN) {
		return userRepository.findById(PRN);
	}
	@Override
	public UserEntity save(UserEntity user) {
		
		return userRepository.save(user);
	}

}

package com.example.hostel.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostel.entity.AdminEntity;
import com.example.hostel.repository.AdminRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService{

	@Autowired
	private AdminRepository adminRepository;
	@Override
	public Optional<AdminEntity> findByPrn(String adminId) {
		return adminRepository.findById(adminId);
	}

	@Override
	public AdminEntity save(AdminEntity admin) {
		return adminRepository.save(admin);
	}

}

package com.example.hostel.service;

import java.util.Optional;

import com.example.hostel.entity.AdminEntity;

public interface AdminService {
	Optional<AdminEntity> findByPrn(String adminId);
	AdminEntity save(AdminEntity admin);

}

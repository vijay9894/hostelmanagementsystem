package com.example.hostel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostel.entity.PermissionEntity;
import com.example.hostel.repository.PermissionRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class PermissionServiceImpl implements PermissionService {

	@Autowired
	private PermissionRepository permissionRepository;
	
	@Override
	public List<PermissionEntity> getAll() {
		return permissionRepository.findAll();
	}

	@Override
	public Optional<PermissionEntity> getByPermissionId(int permissionId) {
		return permissionRepository.findById(permissionId);
	}

	@Override
	public PermissionEntity save(PermissionEntity permission) {
		return permissionRepository.save(permission);
	}

	@Override
	public void deleteByPermissionId(int permissionId) {
		permissionRepository.deleteById(permissionId);
	}

	@Override
	public List<PermissionEntity> getPendingPermissions() {
		return permissionRepository.findByPermissionStatus(PermissionEntity.PermissionStatus.PENDING);
	}

	

}

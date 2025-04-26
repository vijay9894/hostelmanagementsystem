package com.example.hostel.service;

import java.util.List;
import java.util.Optional;

import com.example.hostel.entity.PermissionEntity;

public interface PermissionService {
	public List<PermissionEntity> getAll();
	public Optional<PermissionEntity> getByPermissionId(int permissionId);
	public PermissionEntity save(PermissionEntity permissionId);
	public void deleteByPermissionId(int permissionId);
	public List<PermissionEntity> getPendingPermissions();
	
}

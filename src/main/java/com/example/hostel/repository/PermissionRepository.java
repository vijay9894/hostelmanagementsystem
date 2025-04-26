package com.example.hostel.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hostel.entity.PermissionEntity;
import com.example.hostel.entity.PermissionEntity.PermissionStatus;

@Repository
public interface PermissionRepository extends JpaRepository<PermissionEntity, Integer>{
	List<PermissionEntity> findByPermissionStatus(PermissionStatus permissionStatus);
	
}

package com.example.hostel.service;

import java.util.List;
import java.util.Optional;

import com.example.hostel.entity.ComplaintEntity;


public interface ComplaintService {
	public List<ComplaintEntity> getAll();
	public Optional<ComplaintEntity> getByComplaintId(int complaintId);
	public ComplaintEntity save(ComplaintEntity complaint);
	public void deleteByPermissionId(int complaintId);
}

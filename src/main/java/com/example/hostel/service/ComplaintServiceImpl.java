package com.example.hostel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostel.entity.ComplaintEntity;
import com.example.hostel.repository.ComplaintRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class ComplaintServiceImpl implements ComplaintService {
	
	@Autowired
	private ComplaintRepository complaintRepository;
	
	@Override
	public List<ComplaintEntity> getAll() {
		return complaintRepository.findAll();
	}

	@Override
	public Optional<ComplaintEntity> getByComplaintId(int complaintId) {
		return complaintRepository.findById(complaintId);
	}

	@Override
	public ComplaintEntity save(ComplaintEntity complaint) {
		return complaintRepository.save(complaint);
	}

	@Override
	public void deleteByPermissionId(int complaintId) {
		complaintRepository.deleteById(complaintId);
	}

}

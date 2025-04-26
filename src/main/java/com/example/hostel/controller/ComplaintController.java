package com.example.hostel.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hostel.entity.ComplaintEntity;
import com.example.hostel.service.ComplaintService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/hms/api")
public class ComplaintController {
     
	@Autowired
	private ComplaintService complaintService;
	
	@GetMapping("/complaints")
    public List<ComplaintEntity> getAllComplaints() {
        return complaintService.getAll();
    }
	
	@GetMapping("/complaints/{complaintId}")
	public Optional<ComplaintEntity> complaintById(@PathVariable int complaintId)
	{
		return complaintService.getByComplaintId(complaintId);
	}
	
	@PostMapping("/complaints")
	public ComplaintEntity create(@RequestBody ComplaintEntity complaint)
	{
	    System.out.println(complaint);
		return complaintService.save(complaint);
	}
	
	@PutMapping("/complaints/{complaintId}")
	public ResponseEntity<ComplaintEntity> update(@PathVariable("complaintId") int complaintId, @RequestBody ComplaintEntity updatedComplaint) {
	    Optional<ComplaintEntity> existingComplaint = complaintService.getByComplaintId(complaintId);
	    if (existingComplaint.isPresent()) {
	        ComplaintEntity complaint = existingComplaint.get();
	        complaint.setName(updatedComplaint.getName());
	        complaint.setPRN(updatedComplaint.getPRN());
	        complaint.setRoom(updatedComplaint.getRoom());
	        complaint.setSubject(updatedComplaint.getSubject());
	        complaint.setDate(updatedComplaint.getDate());

	        ComplaintEntity updated = complaintService.save(complaint);
	        return ResponseEntity.ok(updated);
	    }
	    return ResponseEntity.notFound().build();
	}
	
	@DeleteMapping("/complaints/{complaintId}")
	public String deleteByComplaintId(@PathVariable int complaintId)
	{
		complaintService.deleteByPermissionId(complaintId);
		return "complaint with id: " +complaintId + " deleted Successfully";
	}

}

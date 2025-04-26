package com.example.hostel.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.hostel.entity.NoticeEntity;
import com.example.hostel.service.NoticeService;



@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/hms/api")
public class NoticeController {

	@Autowired
	private NoticeService noticeService;
	
	@GetMapping("/notices")
	public List<NoticeEntity> getAllNotices()
	{
		return noticeService.getAllNotices();
	} 
	
	@GetMapping("/notices/{id}")
	public Optional<NoticeEntity> getNoticeById(@PathVariable("id") int id)
	{
	    return noticeService.getByNoticeId(id);	 
	}
	
	@PostMapping("/notices")
	public NoticeEntity AddNotice(@RequestBody NoticeEntity notice)
	{
		noticeService.save(notice);
		return notice;
	}
	
	@PutMapping("/notices")
	public NoticeEntity updateStudent(@RequestBody NoticeEntity student)
	{
		return noticeService.save(student);		
	}
	
	@DeleteMapping("/notices/{id}")
	public String deleteStudentById(@PathVariable("id") int id)
	{
		noticeService.deleteByNoticeId(id);
		return "Student Deleted with " + id + " number";	
	}
	
}

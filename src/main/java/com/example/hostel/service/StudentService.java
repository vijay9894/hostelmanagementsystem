package com.example.hostel.service;

import java.util.List;
import java.util.Optional;

import com.example.hostel.entity.StudentEntity;

public interface StudentService {
    
	public List<StudentEntity> getAll();
	public Optional<StudentEntity> getByPRN(String prn);
    public StudentEntity save(StudentEntity student);
	public void deleteByPRN(String prn);
	
}

package com.example.hostel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostel.entity.StudentEntity;
import com.example.hostel.repository.StudentRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class StudentServiceImpl implements StudentService {

	@Autowired
	private StudentRepository studentRepository;
	
	
	@Override
	public List<StudentEntity> getAll() {
		return studentRepository.findAll();
	}

	@Override
	public Optional<StudentEntity> getByPRN(String prn) {
		
		return studentRepository.findById(prn);
	}

	@Override
	public StudentEntity save(StudentEntity student) {
		return studentRepository.save(student);
	}

	@Override
	public void deleteByPRN(String prn) {
		 studentRepository.deleteById(prn);
		
	}

	

}

package com.example.hostel.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hostel.entity.StudentEntity;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, String>{
	Optional<StudentEntity> findByPRN(String PRN);
}

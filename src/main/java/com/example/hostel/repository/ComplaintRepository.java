package com.example.hostel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hostel.entity.ComplaintEntity;

@Repository
public interface ComplaintRepository extends JpaRepository<ComplaintEntity, Integer> {

}

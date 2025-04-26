package com.example.hostel.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.hostel.entity.RoomEntity;

@Repository
public interface RoomRepository extends JpaRepository<RoomEntity, Integer>{
}

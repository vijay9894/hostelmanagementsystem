package com.example.hostel.service;

import java.util.List;
import java.util.Optional;

import com.example.hostel.entity.RoomEntity;

public interface RoomService {
		
	public List<RoomEntity> getAll();
	public Optional<RoomEntity> getByRoomNo(int roomNo);
	public RoomEntity save(RoomEntity room);
	public void deleteByRoomNo(int roomNo);
	public boolean isRoomFull(int roomNo);
	public void updateRoomCapacity(int roomNo , boolean decreament);
}

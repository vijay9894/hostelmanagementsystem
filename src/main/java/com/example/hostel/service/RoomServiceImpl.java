package com.example.hostel.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.hostel.entity.RoomEntity;
import com.example.hostel.repository.RoomRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class RoomServiceImpl implements RoomService {

	@Autowired
	private RoomRepository roomRepository;
	
	@Override
	public List<RoomEntity> getAll() {
		return roomRepository.findAll();
	}

	@Override
	public Optional<RoomEntity> getByRoomNo(int roomNo) {	
		return roomRepository.findById(roomNo);
	}

	@Override
	public RoomEntity save(RoomEntity room) {
		return roomRepository.save(room);
	}

	@Override
	public void deleteByRoomNo(int roomNo) {
		roomRepository.deleteById(roomNo);
	}

	@Override
	public boolean isRoomFull(int roomNo) {
		Optional<RoomEntity> room = roomRepository.findById(roomNo);
        if (room.isPresent()) {
            RoomEntity roomEntity = room.get();
            return roomEntity.isRoomFilled();
        }
		return false;
	}
	

	@Override
	public void updateRoomCapacity(int roomNo, boolean decrement) {
	    Optional<RoomEntity> room = roomRepository.findById(roomNo);
	    if (room.isPresent()) {
	        RoomEntity roomEntity = room.get();
	        int currentVacancies = roomEntity.getVacancies();
	        int roomCapacity = roomEntity.getRoomCapacity(); // Assuming there's a method to get room capacity

	        System.out.println("Before update: Room " + roomNo + " - Vacancies: " + currentVacancies + ", Filled: " + roomEntity.isRoomFilled()); // Log before

	        if (decrement) {
	            if (currentVacancies > 0) {
	                roomEntity.setVacancies(currentVacancies - 1);
	                if (currentVacancies - 1 <= 0) {
	                    roomEntity.setRoomFilled(true);
	                }
	            } else {
	                System.out.println("Room " + roomNo + " cannot have vacancies less than 0");
	            }
	        } else {
	            if (currentVacancies < roomCapacity) {
	                roomEntity.setVacancies(currentVacancies + 1);
	                if (currentVacancies + 1 > 0) {
	                    roomEntity.setRoomFilled(false);
	                }
	            } else {
	                System.out.println("Room " + roomNo + " cannot have vacancies more than capacity: " + roomCapacity);
	            }
	        }

	        System.out.println("Updating room " + roomNo + " to Vacancies: " + roomEntity.getVacancies() + ", Filled: " + roomEntity.isRoomFilled()); // Log during update
	        roomRepository.save(roomEntity);
	        System.out.println("After update: Room " + roomNo + " - Vacancies: " + roomEntity.getVacancies() + ", Filled: " + roomEntity.isRoomFilled()); // Log after
	    } else {
	       System.out.println("Room " + roomNo + " not found!"); // Log if room not found
	    }
	}


}

package com.example.hostel.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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

import com.example.hostel.entity.RoomEntity;
import com.example.hostel.service.RoomService;

@RestController
@CrossOrigin(origins = "http://localhost:3000") 
@RequestMapping("/hms/api")
public class RoomController {
	
	@Autowired
	private RoomService roomService;
	
	@GetMapping("/rooms")
    public List<RoomEntity> getAllRooms()
    {
		return roomService.getAll();	
    }
	
	@GetMapping("/rooms/{roomNo}")
	public Optional<RoomEntity> getRoomByRoomNo(@PathVariable("roomNo") int roomNo)
	{
		return roomService.getByRoomNo(roomNo);
	}
	
	@PostMapping("/rooms")
	public RoomEntity create(@RequestBody RoomEntity room)
	{
		System.out.println("room details : " + room);
		return roomService.save(room);
	}
	
	@PutMapping("/rooms/{roomNo}")
	public ResponseEntity<?> updateRoom(@PathVariable int roomNo, @RequestBody RoomEntity updatedRoom) {
	    Optional<RoomEntity> existingRoom = roomService.getByRoomNo(roomNo);

	    if (existingRoom.isPresent()) {
	        RoomEntity room = existingRoom.get();
	        room.setRoomCapacity(updatedRoom.getRoomCapacity());
	        room.setVacancies(updatedRoom.getVacancies());
	        roomService.save(room);

	        return ResponseEntity.ok(room);
	    } else {
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Room with number " + roomNo + " not found.");
	    }
	}

	
	@DeleteMapping("/rooms/{roomNo}")
    public ResponseEntity<String> deleteByRoomNo(@PathVariable("roomNo") int roomNo) {
        roomService.deleteByRoomNo(roomNo);
        return ResponseEntity.status(HttpStatus.OK).body("Hostel with hostel RoomNo: " + roomNo + " deleted successfully");
    }
}

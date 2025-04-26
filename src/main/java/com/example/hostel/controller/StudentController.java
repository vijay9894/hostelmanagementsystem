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

import com.example.hostel.entity.StudentEntity;
import com.example.hostel.service.RoomService;
import com.example.hostel.service.StudentService;

@RestController
@CrossOrigin(origins = "http://localhost:3000") 
@RequestMapping("/hms/api")
public class StudentController {
	@Autowired
	private StudentService studentService;
	
	@Autowired
	private RoomService roomService;
	
	@GetMapping("/students")
    public List<StudentEntity> getAllStudents()
    {
		return studentService.getAll();	
    }
	
	@GetMapping("/students/{prn}")
	public Optional<StudentEntity> getStudentByPRN( @PathVariable("prn") String prn)
	{
		return studentService.getByPRN(prn);
	}
	
	@PostMapping("/students")
	public ResponseEntity<?> addStudent(@RequestBody StudentEntity student) {
	    // Ensure PRN is set before persisting
		System.out.println("Received Student: " + student);
		System.out.println((student.getRoomNo()));
	    if (student.getPRN() == null || student.getPRN().isEmpty()) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("PRN must be provided"));
	    }

	    if (roomService.isRoomFull(student.getRoomNo())) {
	        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new ErrorResponse("Room is already filled"));
	    }

	    studentService.save(student);
	    roomService.updateRoomCapacity(student.getRoomNo(), true);
	    return ResponseEntity.status(HttpStatus.CREATED).body(new SuccessResponse("Student added successfully", student));
	}

	
	@PutMapping("/students/{PRN}")
	public ResponseEntity<String> updateStudent(@PathVariable("PRN") String PRN, @RequestBody StudentEntity updatedStudent) {
	    System.out.println("updated student details: " + updatedStudent);
	    Optional<StudentEntity> existingStudent = studentService.getByPRN(PRN);
	    if (existingStudent.isPresent()) {
	        StudentEntity student = existingStudent.get();
	        boolean isRoomFull = roomService.isRoomFull(updatedStudent.getRoomNo());

	        // Check if the student is already in the requested room using != operator
	        if (isRoomFull && student.getRoomNo() != updatedStudent.getRoomNo()) {
	            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Room is already filled");
	        }

	        // Update room capacities only if the room number changes
	        if (student.getRoomNo() != updatedStudent.getRoomNo()) {
	            roomService.updateRoomCapacity(student.getRoomNo(), false);  // Increment the old room capacity
	            roomService.updateRoomCapacity(updatedStudent.getRoomNo(), true);  // Decrement the new room capacity
	        }

	        student.setName(updatedStudent.getName());
	        student.setCourse(updatedStudent.getCourse());
	        student.setYear(updatedStudent.getYear());
	        student.setContactNo(updatedStudent.getContactNo());
	        student.setEmail(updatedStudent.getEmail());
	        student.setAddress(updatedStudent.getAddress());
	        student.setRoomNo(updatedStudent.getRoomNo());
	        studentService.save(student);

	        return ResponseEntity.status(HttpStatus.OK).body("Student updated successfully");
	    }
	    return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student with PRN: " + PRN + " not found");
	}


	
	 @DeleteMapping("/students/{PRN}")
	    public ResponseEntity<String> deleteByPrn(@PathVariable("PRN") String PRN) {
	        Optional<StudentEntity> existingStudent = studentService.getByPRN(PRN);
	        if (existingStudent.isPresent()) {
	            StudentEntity student = existingStudent.get();
	            studentService.deleteByPRN(PRN);
	            roomService.updateRoomCapacity(student.getRoomNo(), false);
	            return ResponseEntity.status(HttpStatus.OK).body("Student with PRN: " + PRN + " deleted successfully");
	        }
	        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Student with PRN: " + PRN + " not found");
	    }
	 
	 public static class ErrorResponse {
	        private String message;

	        public ErrorResponse(String message) {
	            this.message = message;
	        }

	        public String getMessage() {
	            return message;
	        }
	    }
	 
	 public static class SuccessResponse {
		    private String message;
		    private StudentEntity student;  // Include the saved student entity

		    public SuccessResponse(String message, StudentEntity student) {
		        this.message = message;
		        this.student = student;
		    }

		    public String getMessage() {
		        return message;
		    }
		    public StudentEntity getStudent(){
		        return student;
		    }
		    
	 }
	
}

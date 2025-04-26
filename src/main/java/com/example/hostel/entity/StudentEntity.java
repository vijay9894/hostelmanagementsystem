package com.example.hostel.entity;



import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="student")
public class StudentEntity {
    
    @Id
    @Column(name="PRN")
    private String PRN;
    
    @Column(name="name")
    private String name;
    
    @Column(name="course")
    private String course;
    
    @Column(name="year")
    private String year;
    
    @Column(name="contact_no")
    private String contactNo;
    
    @Column(name="email")
    private String email;
    
    @Column(name="address")
    private String address;
    
    @Column(name="room_no")
    private int roomNo;
}

package com.example.hostel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="complaint")
public class ComplaintEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "complaint_id")
    private int complaintId;

    @Column(name = "name")
    private String name;

    @Column(name = "PRN")
    private String PRN;

    @Column(name = "room_no")
    private int room;

    @Column(name = "subject")
    private String subject;

    @Column(name = "date")
    private String date;
}

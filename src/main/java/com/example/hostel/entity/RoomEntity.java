package com.example.hostel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="room")
public class RoomEntity {
    @Id
    @Column(name="room_no")
    private int roomNo;

    @Column(name="room_capacity")
    private int roomCapacity;

    @Column(name="room_filled")
    private boolean roomFilled;

    @Column(name="vacancies")
    private int vacancies;
}

package com.example.hostel.entity;

import jakarta.persistence.*;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name="users")
public class UserEntity {

    @Id
    @Column(name="PRN")
    private String PRN;

    
    @Column(name="password")
    private String password;
}

package com.example.hostel.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="permission")
public class PermissionEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "permission_id")
    private int permissionId;

    @Column(name = "name")
    private String name;

    @Column(name = "PRN")
    private String PRN;

    @Column(name = "room_no")
    private int roomNo;

    @Column(name = "subject")
    private String subject;

    @Column(name = "date")
    private String date;
    
    @Lob
    @Column(name = "file")
    private  String file;

    @Enumerated(EnumType.STRING)
    @Column(name = "permission_status")
    private PermissionStatus permissionStatus;

    public enum PermissionStatus {
        PENDING,
        GRANTED,
        REJECTED;

        public static PermissionStatus fromString(String status) {
            try {
                return PermissionStatus.valueOf(status.toUpperCase());
            } catch (IllegalArgumentException e) {
                throw new RuntimeException("Invalid PermissionStatus value: " + status);
            }
        }
    }
}

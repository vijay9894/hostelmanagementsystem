package com.example.hostel.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="notice")
public class NoticeEntity {
    
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="notice_id")
	private int noticeId;
	
	@Column(name="notice_text")
	private String noticeContent;
	
	@Column(name="notice_date")
	private String noticeDate;
}

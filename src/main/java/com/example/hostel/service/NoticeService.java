package com.example.hostel.service;

import java.util.List;
import java.util.Optional;

import com.example.hostel.entity.NoticeEntity;

//import com.example.hostel.entity.StudentEntity;

public interface NoticeService {
  
	public List<NoticeEntity> getAllNotices();
	public Optional<NoticeEntity> getByNoticeId(int id);
    public NoticeEntity save(NoticeEntity notice);
	public void deleteByNoticeId(int id);
}
